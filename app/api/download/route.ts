import { issueSignedToken, presignUrl } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'
import { verifyCheckoutSession } from '@/lib/checkout'
import { PRODUCT_FILES, readDownloadToken } from '@/lib/downloads'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token') ?? ''
  const claims = readDownloadToken(token)

  if (!claims) {
    return NextResponse.json(
      { error: 'This access link is invalid or has expired. Return to your confirmation page for a fresh link.' },
      { status: 403 },
    )
  }

  // Re-check Stripe before every download. The success URL alone never grants file access.
  const result = await verifyCheckoutSession(claims.sessionId).catch(() => null)
  if (!result || result.status !== 'paid') {
    return NextResponse.json({ error: 'Payment not verified' }, { status: 403 })
  }

  const file = PRODUCT_FILES[result.product.id].find((item) => item.id === claims.fileId)
  if (!file) return NextResponse.json({ error: 'File not included in this purchase' }, { status: 403 })

  try {
    // Give the verified buyer temporary GET-only access to exactly one private Blob object.
    // The large ZIP is served by Blob directly, not streamed through the app Function.
    const delegationValidUntil = Date.now() + 15 * 60 * 1000
    const signedUrlValidUntil = Date.now() + 5 * 60 * 1000

    const delegationToken = await issueSignedToken({
      pathname: file.blobPath,
      operations: ['get'],
      validUntil: delegationValidUntil,
    })

    const { presignedUrl } = await presignUrl(delegationToken, {
      pathname: file.blobPath,
      operation: 'get',
      validUntil: signedUrlValidUntil,
    })

    const response = NextResponse.redirect(presignedUrl, 307)
    response.headers.set('Cache-Control', 'private, no-store')
    return response
  } catch (error) {
    console.error('Failed to create private Blob download:', (error as Error).message)
    return NextResponse.json(
      { error: 'Your download is temporarily unavailable. Please refresh your confirmation page and try again.' },
      { status: 503 },
    )
  }
}
