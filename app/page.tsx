import { Hero } from '@/components/store/hero'
import { Pricing } from '@/components/store/pricing'
import { Faq, Themes } from '@/components/store/details'
import { SiteFooter, SiteHeader } from '@/components/store/site-chrome'
import { CheckoutCancelledNotice } from '@/components/store/checkout-cancelled-notice'
import { ReviewRoad, UseCases } from '@/components/store/review-road'
import { StickyMobileCta } from '@/components/store/sticky-mobile-cta'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>
}) {
  const { checkout } = await searchParams

  return (
    <>
      <SiteHeader />
      {checkout === 'cancelled' ? <CheckoutCancelledNotice /> : null}
      <main>
        <Hero />
        <Pricing />
        <UseCases />
        <Themes />
        <ReviewRoad />
        <Faq />
      </main>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <SiteFooter />
      <StickyMobileCta />
    </>
  )
}
