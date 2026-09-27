export type ProductId = 'starter' | 'plus' | 'mega'

export const PRODUCT_IDS: readonly ProductId[] = ['starter', 'plus', 'mega'] as const

export interface Product {
  id: ProductId
  name: string
  shortName: string
  description: string
  /**
   * Display price. When a Stripe Price ID is configured for this product (see lib/checkout.ts),
   * Stripe charges that price, so keep this value in sync with the Stripe Dashboard.
   */
  priceInCents: number
  /** Optional regular/reference price, shown crossed out. Remove it to end a promotion. */
  compareAtInCents?: number
  badges?: string[]
  pageCount: string
  features: string[]
  downloadHeadline: string
}

export const CURRENCY = 'eur'

// PROMOTIONAL PRICING: edit priceInCents / compareAtInCents / badges here to change or end a sale.
// Every price, badge, CTA and upsell amount on the site is derived from these values.
export const PRODUCTS: Record<ProductId, Product> = {
  starter: {
    id: 'starter',
    name: '500+ Printable Coloring Pages',
    shortName: 'Starter Pack',
    description: 'A big, happy collection of printable pages for rainy days, road trips and quiet time.',
    priceInCents: 799,
    compareAtInCents: 999,
    badges: ['SALE'],
    pageCount: '500+',
    features: [
      '500+ high-resolution printable pages',
      'Animals, vehicles, dinosaurs and more',
      'A4 and US Letter PDF formats',
      'Print as many times as you like',
    ],
    downloadHeadline: 'Download Your 500+ Coloring Pages',
  },
  plus: {
    id: 'plus',
    name: '1,500+ Printable Coloring Pages',
    shortName: '1,500+ Pack',
    description: 'Three times the Starter Pack, with more themes and activities for every age.',
    priceInCents: 1598,
    pageCount: '1,500+',
    features: [
      '1,500+ printable coloring pages',
      '3× the number of pages',
      'Multiple fun themes',
      'Animals, dinosaurs, vehicles, nature, space & more',
      'Instant digital PDF download',
      'Print at home',
    ],
    downloadHeadline: 'Download Your 1,500+ Coloring Pages',
  },
  mega: {
    id: 'mega',
    name: 'Ultimate 2,500+ Printable Coloring Pages Mega Bundle',
    shortName: 'Mega Bundle',
    description: 'Everything in the Starter Pack plus 2,000 more pages across every theme kids love.',
    priceInCents: 1999,
    compareAtInCents: 2999,
    badges: ['MEGA SALE', 'BEST VALUE'],
    pageCount: '2,500+',
    features: [
      '2,500+ printable pages in 5 themed packs',
      'Includes the full 500+ Starter Pack',
      'Seasonal, fairy tale, space and ocean packs',
      'Activity sheets, mazes and dot-to-dots',
      'A4 and US Letter PDF formats',
    ],
    downloadHeadline: 'Download Your Complete 2,500+ Page Collection',
  },
}

/** The upsell offered after choosing the Starter Pack. */
export const UPSELL = { from: PRODUCTS.starter, to: PRODUCTS.plus, multiplier: '3×' } as const

export function isProductId(value: unknown): value is ProductId {
  return typeof value === 'string' && (PRODUCT_IDS as readonly string[]).includes(value)
}

export function getSavingsInCents(product: Product) {
  return product.compareAtInCents ? product.compareAtInCents - product.priceInCents : 0
}

export function formatPrice(cents: number) {
  const hasCents = cents % 100 !== 0
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: hasCents ? 2 : 0,
  }).format(cents / 100)
}
