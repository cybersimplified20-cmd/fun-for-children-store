import { type NextRequest, NextResponse } from 'next/server'
import { handleStripeWebhook } from '@/lib/checkout'

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  // Signature verification requires the exact raw body, so read text() and never parse JSON first.
  const rawBody = await request.text()

  try {
    const event = await handleStripeWebhook(rawBody, signature)
    return NextResponse.json({ received: true, type: event.type })
  } catch (error) {
    const message = (error as Error).message
    const isSignatureError = (error as { type?: string }).type === 'StripeSignatureVerificationError'
    console.error('Stripe webhook error:', isSignatureError ? 'invalid signature' : message)
    return NextResponse.json(
      { error: isSignatureError ? 'Invalid signature' : 'Webhook handler failed' },
      { status: isSignatureError ? 400 : 500 },
    )
  }
}
