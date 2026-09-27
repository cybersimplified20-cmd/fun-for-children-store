'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const heroImages = [
  { src: '/images/hero-coloring.webp', alt: 'Animal coloring pages inside the bundle' },
  { src: '/images/hero-carousel-1.webp', alt: 'Dinosaur coloring pages inside the bundle' },
  { src: '/images/hero-carousel-2.webp', alt: 'Fairy tale coloring pages inside the bundle' },
  { src: '/images/hero-carousel-3.webp', alt: 'Space and vehicle coloring pages inside the bundle' },
]

export function HeroCarousel() {
  const [activeImage, setActiveImage] = useState(0)
  const [carouselReady, setCarouselReady] = useState(false)

  useEffect(() => {
    const activate = () => setCarouselReady(true)

    if (document.readyState === 'complete') {
      const id = window.setTimeout(activate, 1500)
      return () => window.clearTimeout(id)
    }

    window.addEventListener('load', activate, { once: true })
    return () => window.removeEventListener('load', activate)
  }, [])

  useEffect(() => {
    if (!carouselReady) return

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [carouselReady])

  const showImage = (index: number) => setActiveImage(index)
  const previousImage = () => showImage((activeImage - 1 + heroImages.length) % heroImages.length)
  const nextImage = () => showImage((activeImage + 1) % heroImages.length)

  return (
    <div className="w-full max-w-xl flex-1 lg:max-w-none">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-4 border-card shadow-xl">
        {activeImage === 0 ? (
          <Image
            src={heroImages[0].src}
            alt={heroImages[0].alt}
            fill
            priority
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <Image
            key={heroImages[activeImage].src}
            src={heroImages[activeImage].src}
            alt={heroImages[activeImage].alt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        )}

        {carouselReady && (
          <>
            <button type="button" onClick={previousImage} aria-label="Previous image" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-background">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={nextImage} aria-label="Next image" className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-background">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-background/70 px-3 py-2 backdrop-blur-sm">
              {heroImages.map((image, index) => (
                <button key={image.src} type="button" onClick={() => showImage(index)} aria-label={`Show image ${index + 1}`} aria-current={index === activeImage ? 'true' : undefined} className={`size-2.5 rounded-full transition ${index === activeImage ? 'bg-foreground' : 'bg-foreground/35'}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-muted-foreground sm:text-sm">‹ Swipe to preview pages inside the bundle ›</p>
    </div>
  )
}
