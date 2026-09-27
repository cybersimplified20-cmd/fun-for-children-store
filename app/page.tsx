import { Hero } from '@/components/store/hero'
import { Pricing } from '@/components/store/pricing'
import { Faq, Themes } from '@/components/store/details'
import { SiteFooter, SiteHeader } from '@/components/store/site-chrome'
import { CheckoutCancelledNotice } from '@/components/store/checkout-cancelled-notice'

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
        <Themes />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}
