import { Download, Printer, Star } from 'lucide-react'
import { SecureBadge } from '@/components/checkout/secure-badge'
import { CheckoutButton } from '@/components/checkout/checkout-button'
import { PRODUCTS, formatPrice } from '@/lib/products'
import { HeroCarousel } from '@/components/store/hero-carousel'

export function Hero() {
  return (
    <section className="px-4 pb-8 pt-8 sm:pb-12 sm:pt-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
            <Star className="size-4 fill-current" aria-hidden="true" />
            2,500+ Pages • Loved by Parents & Teachers
          </p>

          <h1 className="font-heading text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
            2,500+ Printable Coloring & Activity Pages for Kids
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Animals, dinosaurs, fairy tales, space, vehicles and more. Download instantly, print at home and keep a huge library ready for whenever you need it.
          </p>

          <div className="flex w-full max-w-sm flex-col items-center gap-2 lg:items-start">
            <CheckoutButton
              productId="mega"
              label={`Get 2,500+ Pages – ${formatPrice(PRODUCTS.mega.priceInCents)}`}
              className="px-8 text-base"
            />
            <p className="text-xs font-semibold text-muted-foreground">One-time payment • No subscription</p>
            <SecureBadge />
          </div>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            <li className="flex items-center gap-2">
              <Download className="size-4 text-accent" aria-hidden="true" />
              Instant digital download
            </li>
            <li className="flex items-center gap-2">
              <Printer className="size-4 text-accent" aria-hidden="true" />
              Print again whenever you need
            </li>
          </ul>
        </div>

        <HeroCarousel />
      </div>
    </section>
  )
}
