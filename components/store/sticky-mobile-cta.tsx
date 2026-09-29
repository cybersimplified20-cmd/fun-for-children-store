'use client'

import { CheckoutButton } from '@/components/checkout/checkout-button'
import { PRODUCTS, formatPrice } from '@/lib/products'

export function StickyMobileCta() {
  const mega = PRODUCTS.mega

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 px-3 py-2 shadow-lg backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="min-w-0 shrink-0">
          <p className="text-xs font-bold leading-tight">2,500+ pages</p>
          <p className="text-sm font-semibold text-primary">{formatPrice(mega.priceInCents)}</p>
        </div>
        <CheckoutButton
          productId="mega"
          label="Get instant access"
          loadingLabel="Opening..."
          showError={false}
          className="h-11 px-4 text-sm"
        />
      </div>
    </aside>
  )
}
