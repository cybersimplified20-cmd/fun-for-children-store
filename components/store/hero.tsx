'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Download, Printer, Star } from 'lucide-react'
import { SecureBadge } from '@/components/checkout/secure-badge'
import { PRODUCTS, formatPrice } from '@/lib/products'

const heroImages = [
  { src: '/images/hero-coloring.webp', alt: 'Animal coloring pages inside the bundle' },
  { src: '/images/hero-carousel-1.webp', alt: 'Dinosaur coloring pages inside the bundle' },
  { src: '/images/hero-carousel-2.webp', alt: 'Fairy tale coloring pages inside the bundle' },
  { src: '/images/hero-carousel-3.webp', alt: 'Space and vehicle coloring pages inside the bundle' },
]

export function Hero() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    // Keep the first hero image stable during initial rendering so the
    // automatic carousel does not replace the page's LCP candidate.
    let timer: number | undefined

    const startAutoplay = () => {
      timer = window.setInterval(() => {
        setActiveImage((current) => (current + 1) % heroImages.length)
      }, 3500)
    }

    const delay = window.setTimeout(startAutoplay, 8000)

    return () => {
      window.clearTimeout(delay)
      if (timer !== undefined) window.clearInterval(timer)
    }
  }, [])

  const previousImage = () =>
    setActiveImage((current) => (current - 1 + heroImages.length) % heroImages.length)
  const nextImage = () => setActiveImage((current) => (current + 1) % heroImages.length)

  return (
    <section className="px-4 pb-12 pt-10 sm:pb-20 sm:pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
            <Star className="size-4 fill-current" aria-hidden="true" />
            Loved by 12,000+ parents and teachers
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
            2,500+ Printable Coloring & Activity Pages for Kids
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
              Get 2,500+ Pages – {formatPrice(PRODUCTS.mega.priceInCents)}
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

        <div className="w-full max-w-xl flex-1 lg:max-w-none">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-4 border-card shadow-xl">
          {heroImages.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-700 ${
                index === activeImage ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            />
          ))}
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-background"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-background"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-background/70 px-3 py-2 backdrop-blur-sm">
            {heroImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === activeImage ? 'true' : undefined}
                className={`size-2.5 rounded-full transition ${
                  index === activeImage ? 'bg-foreground' : 'bg-foreground/35'
                }`}
              />
            ))}
          </div>
          </div>
          <p className="mt-3 text-center text-xs font-semibold text-muted-foreground sm:text-sm">
            ‹ Swipe to preview pages inside the bundle ›
          </p>
        </div>
      </div>
    </section>
  )
}
