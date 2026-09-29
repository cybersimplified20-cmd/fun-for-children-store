import 'server-only'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { CURRENCY, PRODUCTS, isProductId, type Product, type ProductId } from '@/lib/products'

// STRIPE PRICE IDS: create one one-time EUR price per product in the Stripe Dashboard
// (Product catalog -> Add product) and paste the price_... IDs into Settings -> Vars.
const PRICE_ID_ENV: Record<ProductId, string | undefined> = {
  starter: process.env.STRIPE_STARTER_PRICE_ID, // 500+ pages, €7.99
  plus: process.env.STRIPE_PLUS_PRICE_ID, // 1,500+ pages (upsell), €15.98
  mega: process.env.STRIPE_MEGA_PRICE_ID, // 2,500+ pages, €19.99
}

function buildLineItem(productId: ProductId): Stripe.Checkout.SessionCreateParams.LineItem {
  const priceId = PRICE_ID_ENV[productId]
  if (priceId) return { price: priceId, quantity: 1 }

  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
    throw new Error(`Missing Stripe Price ID for "${productId}"`)
  }

  // Development fallback until the Price ID env vars are set: the amount still comes from the
  // server-side catalog, never from the browser.
  const product = PRODUCTS[productId]
  return {
    quantity: 1,
    price_data: {
      currency: CURRENCY,
      unit_amount: product.priceInCents,
      product_data: { name: product.name, description: product.description },
    },
  }
}

export async function createCheckoutSession({
  productId,
  siteUrl,
  idempotencyKey,
}: {
  productId: ProductId
  siteUrl: string
  idempotencyKey: string
}) {
  const session = await stripe.checkout.sessions.create(
    {
      mode: 'payment',
      line_items: [buildLineItem(productId)],
      // No payment_method_types: Stripe picks eligible methods (cards, Apple Pay, Google Pay,
      // Link, local methods) automatically from your Dashboard settings and the buyer's location.
      customer_creation: 'always',
      billing_address_collection: 'auto',
      locale: 'auto',
      allow_promotion_codes: true,
      branding_settings: {
        display_name: 'Fun For Children',
        background_color: '#FEFAF1',
        button_color: '#E8542F',
        border_style: 'rounded',
        font_family: 'nunito',
        icon: {
          type: 'url',
          url: `${siteUrl}/images/fun-for-children-logo.jpg`,
        },
        logo: {
          type: 'url',
          url: `${siteUrl}/images/fun-for-children-logo.jpg`,
        },
      },
      custom_text: {
        submit: {
          message: 'Instant digital download after payment • One-time payment • No subscription',
        },
      },
      metadata: { product_id: productId },
      payment_intent_data: { metadata: { product_id: productId } },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=cancelled`,
    },
    { idempotencyKey },
  )

  if (!session.url) throw new Error('Stripe did not return a Checkout URL')
  return session
}

export function getPurchasedProduct(session: Stripe.Checkout.Session): Product | null {
  const productId = session.metadata?.product_id
  return isProductId(productId) ? PRODUCTS[productId] : null
}

export type VerificationResult =
  | { status: 'paid'; product: Product; email: string | null; session: Stripe.Checkout.Session }
  | { status: 'pending' }
  | { status: 'invalid' }

/** Asks Stripe directly whether a Checkout Session was paid. The success URL alone proves nothing. */
export async function verifyCheckoutSession(sessionId: string): Promise<VerificationResult> {
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return { status: 'invalid' }

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch (error) {
    if ((error as Stripe.errors.StripeError)?.type === 'StripeInvalidRequestError') {
      return { status: 'invalid' }
    }
    throw error
  }

  const product = getPurchasedProduct(session)
  if (!product) return { status: 'invalid' }

  const isPaid =
    session.status === 'complete' &&
    (session.payment_status === 'paid' || session.payment_status === 'no_payment_required')

  if (!isPaid) return { status: 'pending' }

  return {
    status: 'paid',
    product,
    email: session.customer_details?.email ?? null,
    session,
  }
}

export async function recordPurchase(session: Stripe.Checkout.Session) {
  // Stripe remains the source of truth for orders. This hook is intentionally lightweight;
  // add a database/email integration later if you want a separate customer/order dashboard.
  console.info('Paid order verified', {
    checkoutSessionId: session.id,
    productId: session.metadata?.product_id ?? null,
    paymentStatus: session.payment_status,
    livemode: session.livemode,
  })
}

/** Verifies the webhook signature against the RAW body and records paid purchases. */
export async function handleStripeWebhook(rawBody: string, signature: string) {
  // STRIPE WEBHOOK SECRET: copy the whsec_... signing secret from Stripe Dashboard ->
  // Developers -> Webhooks -> your endpoint, and set it as STRIPE_WEBHOOK_SECRET in Settings -> Vars.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is not set')

  const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object
      if (getPurchasedProduct(session)) await recordPurchase(session)
      break
    }
    default:
      break
  }

  return event
}
