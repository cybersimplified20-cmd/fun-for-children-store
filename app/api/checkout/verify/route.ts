import { type NextRequest, NextResponse } from 'next/server'
import { recordPurchase, verifyCheckoutSession } from '@/lib/checkout'
import { PRODUCT_FILES, createSecureDownload } from '@/lib/downloads'

export type VerifyResponse =
  | {
      status: 'paid'
      product: { id: string; name: string; downloadHeadline: string; pageCount: string }
      email: string | null
      downloads: { id: string; label: string; url: string }[]
      expiresAt: number
    }
  | { status: 'pending' }
  | { status: 'invalid' }

const noStore = { 'Cache-Control': 'no-store' }

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id') ?? ''

  try {
    const result = await verifyCheckoutSession(sessionId)

    if (result.status !== 'paid') {
      return NextResponse.json<VerifyResponse>({ status: result.status }, { headers: noStore })
    }

    // Keeps a purchase record even if the webhook hasn't arrived yet (idempotent overwrite).
    recordPurchase(result.session).catch((error) =>
      console.error('Failed to record purchase:', (error as Error).message),
    )

    const downloads = PRODUCT_FILES[result.product.id].map((file) => {
      const link = createSecureDownload(result.session.id, file.id)
      return { id: file.id, label: file.label, url: link.url, expiresAt: link.expiresAt }
    })

    return NextResponse.json<VerifyResponse>(
      {
        status: 'paid',
        product: {
          id: result.product.id,
          name: result.product.name,
          downloadHeadline: result.product.downloadHeadline,
          pageCount: result.product.pageCount,
        },
        email: result.email,
        downloads: downloads.map(({ id, label, url }) => ({ id, label, url })),
        expiresAt: downloads[0]?.expiresAt ?? 0,
      },
      { headers: noStore },
    )
  } catch (error) {
    console.error('Payment verification failed:', (error as Error).message)
    // A Stripe/network hiccup is not a failed payment; tell the client to keep checking.
    return NextResponse.json<VerifyResponse>({ status: 'pending' }, { status: 503, headers: noStore })
  }
}
