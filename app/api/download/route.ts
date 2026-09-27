import { type NextRequest, NextResponse } from 'next/server'
import { verifyCheckoutSession } from '@/lib/checkout'
import { PRODUCT_FILES, readDownloadToken } from '@/lib/downloads'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token') ?? ''
  const claims = readDownloadToken(token)

  if (!claims) {
    return NextResponse.json({ error: 'This access link is invalid or has expired. Return to your confirmation page for a fresh link.' }, { status: 403 })
  }

  // Verify the Stripe Checkout Session again before revealing/redirecting to the Drive file.
  const result = await verifyCheckoutSession(claims.sessionId).catch(() => null)
  if (!result || result.status !== 'paid') {
    return NextResponse.json({ error: 'Payment not verified' }, { status: 403 })
  }

  const file = PRODUCT_FILES[result.product.id].find((item) => item.id === claims.fileId)
  if (!file) return NextResponse.json({ error: 'File not included in this purchase' }, { status: 403 })
  if (!file.driveUrl) {
    console.error(`Missing Google Drive URL for product ${result.product.id}`)
    return NextResponse.json({ error: 'Your files are being configured. Please contact support.' }, { status: 503 })
  }

  let destination: URL
  try {
    destination = new URL(file.driveUrl)
  } catch {
    return NextResponse.json({ error: 'Product delivery URL is misconfigured.' }, { status: 500 })
  }

  if (destination.protocol !== 'https:' || !['drive.google.com', 'docs.google.com'].includes(destination.hostname)) {
    return NextResponse.json({ error: 'Product delivery URL is not an approved Google Drive URL.' }, { status: 500 })
  }

  return NextResponse.redirect(destination, 307)
}
