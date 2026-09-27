import Image from 'next/image'
import { Download, Printer, Star } from 'lucide-react'
import { SecureBadge } from '@/components/checkout/secure-badge'
import { PRODUCTS, formatPrice } from '@/lib/products'

export function Hero() {
  return (
    <section className="px-4 pb-12 pt-10 sm:pb-20 sm:pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
            <Star className="size-4 fill-current" aria-hidden="true" />
            Loved by 12,000+ parents and teachers
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
            500+ printable coloring pages kids actually love
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Dinosaurs, unicorns, rockets and more. Download instantly, print at home, and turn any
            afternoon into a creative one.
          </p>
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto lg:items-start">
            <a
              href="#pricing"
              className="inline-flex h-13 w-full items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-auto"
            >
              Get {PRODUCTS.starter.pageCount} Pages – {formatPrice(PRODUCTS.starter.priceInCents)}
            </a>
            <SecureBadge />
          </div>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            <li className="flex items-center gap-2">
              <Download className="size-4 text-accent" aria-hidden="true" />
              Instant download
            </li>
            <li className="flex items-center gap-2">
              <Printer className="size-4 text-accent" aria-hidden="true" />
              Print unlimited copies
            </li>
          </ul>
        </div>

        <div className="relative aspect-[16/9] w-full max-w-xl flex-1 overflow-hidden rounded-3xl border-4 border-card shadow-xl lg:max-w-none">
          <Image
            src="/images/hero-coloring.webp"
            alt="Printed kids coloring pages of dinosaurs, unicorns and rockets with crayons on a table"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
