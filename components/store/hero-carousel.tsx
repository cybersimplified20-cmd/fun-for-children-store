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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [])

  const showImage = (index: number) => setActiveImage(index)
  const previousImage = () => showImage((activeImage - 1 + heroImages.length) % heroImages.length)
  const nextImage = () => showImage((activeImage + 1) % heroImages.length)

  return (
    <div className="w-full max-w-xl flex-1 lg:max-w-none">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-4 border-card shadow-xl">
        <Image
          key={heroImages[activeImage].src}
          src={heroImages[activeImage].src}
          alt={heroImages[activeImage].alt}
          fill
          priority={activeImage === 0}
          loading={activeImage === 0 ? 'eager' : 'lazy'}
          fetchPriority={activeImage === 0 ? 'high' : 'auto'}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
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
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-muted-foreground sm:text-sm">‹ Swipe to preview pages inside the bundle ›</p>
    </div>
  )
}
