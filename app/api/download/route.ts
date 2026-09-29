import { type NextRequest, NextResponse } from 'next/server'
import { verifyCheckoutSession } from '@/lib/checkout'
import { PRODUCT_FILES, readDownloadToken } from '@/lib/downloads'

function getGoogleDriveFileId(rawUrl: string) {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return null
  }

  if (url.protocol !== 'https:' || !['drive.google.com', 'docs.google.com'].includes(url.hostname)) {
    return null
  }

  const pathMatch = url.pathname.match(/\/file\/d\/([^/]+)/)
  const fileId = pathMatch?.[1] ?? url.searchParams.get('id')

  return fileId && /^[A-Za-z0-9_-]+$/.test(fileId) ? fileId : null
}

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

  if (!file.driveUrl) {
    console.error(`Missing Google Drive URL for product ${result.product.id}`)
    return NextResponse.json(
      { error: 'Your files are being configured. Please contact support.' },
      { status: 503 },
    )
  }

  const driveFileId = getGoogleDriveFileId(file.driveUrl)
  if (!driveFileId) {
    return NextResponse.json({ error: 'Product delivery URL is misconfigured.' }, { status: 500 })
  }

  // Send the verified buyer straight to Google's download endpoint instead of the Drive preview page.
  const destination = new URL('https://drive.usercontent.google.com/download')
  destination.searchParams.set('id', driveFileId)
  destination.searchParams.set('export', 'download')
  destination.searchParams.set('confirm', 't')

  const response = NextResponse.redirect(destination, 307)
  response.headers.set('Cache-Control', 'no-store')
  return response
}
