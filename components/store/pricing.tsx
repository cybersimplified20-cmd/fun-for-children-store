'use client'

import { useState } from 'react'
import { Check, CreditCard, Loader2, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UpsellDialog } from '@/components/checkout/upsell-dialog'
import { SecureBadge } from '@/components/checkout/secure-badge'
import { useCheckout } from '@/components/checkout/use-checkout'
import {
  PRODUCTS,
  formatPrice,
  getSavingsInCents,
  type Product,
  type ProductId,
} from '@/lib/products'
import { cn } from '@/lib/utils'

export function Pricing() {
  const { state, startCheckout, reset } = useCheckout()
  const [upsellOpen, setUpsellOpen] = useState(false)

  const pendingProductId = state.status === 'loading' || state.status === 'redirecting' ? state.productId : null
  const busy = state.status === 'loading' || (state.status === 'redirecting' && !state.blockedPopup)

  function handleSelect(productId: ProductId) {
    void startCheckout(productId)
  }

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Instant download</p>
          <h2 id="pricing-title" className="font-heading text-3xl font-semibold text-balance sm:text-4xl">
            Pick your coloring collection
          </h2>
          <p className="max-w-xl text-pretty text-muted-foreground">
            One-time payment. No subscription. Print at home as many times as you like.
          </p>
        </div>

        {state.status === 'error' ? (
          <div
            role="alert"
            className="mx-auto flex w-full max-w-2xl items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm"
          >
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            <p className="flex-1">{state.message}</p>
            <button type="button" onClick={reset} className="font-bold underline underline-offset-4">
              Dismiss
            </button>
          </div>
        ) : null}

        {state.status === 'redirecting' && state.blockedPopup ? (
          <div
            role="status"
            className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 rounded-xl border bg-card p-4 text-center text-sm sm:flex-row sm:text-left"
          >
            <p className="flex-1">Your secure checkout is ready. Open it to complete your purchase.</p>
            <a
              href={state.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={reset}
              className="inline-flex h-10 items-center rounded-lg bg-primary px-4 font-bold text-primary-foreground"
            >
              Open secure checkout
            </a>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          <PlanCard
            product={PRODUCTS.mega}
            featured
            showSavings
            ctaLabel={`Get the Mega Bundle – ${formatPrice(PRODUCTS.mega.priceInCents)}`}
            loading={pendingProductId === 'mega' && !upsellOpen}
            disabled={busy}
            onClick={() => handleSelect('mega')}
          />
          <PlanCard
            product={PRODUCTS.starter}
            ctaLabel={`Get ${PRODUCTS.starter.pageCount} Pages – ${formatPrice(PRODUCTS.starter.priceInCents)}`}
            loading={pendingProductId === 'starter' && !upsellOpen}
            disabled={busy}
            onClick={() => {
              reset()
              setUpsellOpen(true)
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <SecureBadge />
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="size-3.5" aria-hidden="true" />
            Cards, Apple Pay, Google Pay, Link and local payment methods accepted worldwide
          </p>
        </div>
      </div>

      <UpsellDialog
        open={upsellOpen}
        onOpenChange={setUpsellOpen}
        onSelect={handleSelect}
        pendingProductId={upsellOpen && busy ? pendingProductId : null}
      />
    </section>
  )
}

function PlanCard({
  product,
  featured = false,
  showSavings = false,
  ctaLabel,
  loading,
  disabled,
  onClick,
}: {
  product: Product
  featured?: boolean
  showSavings?: boolean
  ctaLabel: string
  loading: boolean
  disabled: boolean
  onClick: () => void
}) {
  return (
    <article
      className={cn(
        'relative flex flex-col gap-6 rounded-3xl border bg-card p-6 sm:p-8',
        featured && 'border-2 border-primary shadow-[0_12px_40px_-12px] shadow-primary/30',
      )}
    >
      {product.badges?.length ? (
        <div className="absolute -top-3.5 left-6 flex flex-wrap gap-2">
          {product.badges.map((badge, index) => (
            <span
              key={badge}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-bold tracking-wide',
                index === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground',
              )}
            >
              {badge}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl font-semibold text-balance">{product.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-heading text-5xl font-semibold text-primary">
            <span className="sr-only">Sale price </span>
            {formatPrice(product.priceInCents)}
          </span>
          {product.compareAtInCents ? (
            <s className="text-lg text-muted-foreground">
              <span className="sr-only">Regular price </span>
              {formatPrice(product.compareAtInCents)}
            </s>
          ) : null}
        </div>
        {showSavings && getSavingsInCents(product) > 0 ? (
          <p className="w-fit rounded-md bg-accent/15 px-2 py-0.5 text-sm font-bold text-accent">
            Save {formatPrice(getSavingsInCents(product))}
          </p>
        ) : null}
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        variant={featured ? 'default' : 'secondary'}
        className="h-13 w-full whitespace-normal rounded-xl text-base font-bold"
        disabled={disabled}
        onClick={onClick}
      >
        {loading ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Redirecting to secure checkout...
          </>
        ) : (
          ctaLabel
        )}
      </Button>
    </article>
  )
}
