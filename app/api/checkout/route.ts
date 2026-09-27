import { type NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/checkout'
import { isProductId } from '@/lib/products'

function getSiteUrl(request: NextRequest) {
  // SITE URL: set NEXT_PUBLIC_SITE_URL (e.g. https://yourstore.com) in Settings -> Vars for production.
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '')
  return configured || request.nextUrl.origin
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { productId, attemptId } = (body ?? {}) as { productId?: unknown; attemptId?: unknown }

  if (!isProductId(productId)) {
    return NextResponse.json({ error: 'Unknown product' }, { status: 400 })
  }
  if (typeof attemptId !== 'string' || !/^[A-Za-z0-9-]{8,64}$/.test(attemptId)) {
    return NextResponse.json({ error: 'Invalid checkout attempt' }, { status: 400 })
  }

  try {
    const session = await createCheckoutSession({
      productId,
      siteUrl: getSiteUrl(request),
      idempotencyKey: `checkout-${productId}-${attemptId}`,
    })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout session creation failed:', (error as Error).message)
    return NextResponse.json(
      { error: 'We could not start checkout. Please try again in a moment.' },
      { status: 500 },
    )
  }
}
