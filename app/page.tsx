import { Hero } from '@/components/store/hero'
import { Pricing } from '@/components/store/pricing'
import { Faq, Themes } from '@/components/store/details'
import { SiteFooter, SiteHeader } from '@/components/store/site-chrome'
import { CheckoutCancelledBanner } from '@/components/store/checkout-cancelled-banner'
import { ReviewRoad, UseCases } from '@/components/store/review-road'
import { StickyMobileCta } from '@/components/store/sticky-mobile-cta'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <CheckoutCancelledBanner />
      <main>
        <Hero />
        <div className="[content-visibility:auto] [contain-intrinsic-size:900px]">
          <Pricing />
        </div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:900px]">
          <ReviewRoad />
        </div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:900px]">
          <UseCases />
        </div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:700px]">
          <Themes />
        </div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:700px]">
          <Faq />
        </div>
      </main>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <SiteFooter />
      <StickyMobileCta />
    </>
  )
}
