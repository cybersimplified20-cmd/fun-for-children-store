import type { Metadata } from 'next'
import { SiteFooter, SiteHeader } from '@/components/store/site-chrome'
import { PurchaseVerification } from '@/components/success/purchase-verification'

export const metadata: Metadata = {
  title: 'Your downloads | Fun For Children',
  robots: { index: false, follow: false },
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams

  return (
    <>
      <SiteHeader />
      <main className="px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <PurchaseVerification sessionId={sessionId ?? ''} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
