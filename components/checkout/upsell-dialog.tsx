'use client'

import Image from 'next/image'
import { ArrowRight, Check, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { UPSELL, formatPrice, type ProductId } from '@/lib/products'
import { SecureBadge } from '@/components/checkout/secure-badge'

const { from: current, to: upgrade, multiplier } = UPSELL
const extraCost = formatPrice(upgrade.priceInCents - current.priceInCents)

export function UpsellDialog({
  open,
  onOpenChange,
  onSelect,
  pendingProductId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (productId: ProductId) => void
  pendingProductId: ProductId | null
}) {
  const busy = pendingProductId !== null

  return (
    <Dialog open={open} onOpenChange={(next) => !busy && onOpenChange(next)}>
      <DialogContent className="max-h-[92dvh] overflow-y-auto p-0 sm:max-w-lg">
        <div className="relative h-32 w-full overflow-hidden rounded-t-xl bg-secondary sm:h-40">
          <Image
            src="/images/mega-bundle.png"
            alt="A stack of printed coloring pages"
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            One-time offer
          </span>
        </div>

        <div className="flex flex-col gap-5 px-5 pb-5 sm:px-6 sm:pb-6">
          <DialogHeader className="gap-2 text-left">
            <DialogTitle className="font-heading text-2xl font-semibold leading-tight text-balance">
              Wait! Get {multiplier} the Pages for Just {extraCost} More{' '}
              <span aria-hidden="true">🎨</span>
            </DialogTitle>
            <DialogDescription className="text-pretty text-base leading-relaxed">
              Upgrade from {current.pageCount} to {upgrade.pageCount} printable coloring pages and
              unlock 1,000+ extra activities for just {extraCost} more.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
            <div className="flex flex-col gap-1 rounded-xl border bg-muted/40 p-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Your current choice
              </span>
              <span className="font-heading text-lg font-semibold">{current.pageCount} Pages</span>
              <span className="text-sm text-muted-foreground">{formatPrice(current.priceInCents)}</span>
            </div>
            <ArrowRight className="size-5 self-center text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col gap-1 rounded-xl border-2 border-primary bg-primary/5 p-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Upgrade</span>
              <span className="font-heading text-lg font-semibold">{upgrade.pageCount} Pages</span>
              <span className="text-sm font-bold text-primary">Only +{extraCost}</span>
            </div>
          </div>

          <p className="flex items-baseline justify-between rounded-xl bg-secondary px-4 py-3 text-secondary-foreground">
            <span className="text-sm font-bold uppercase tracking-wider">Total</span>
            <span className="font-heading text-2xl font-semibold">{formatPrice(upgrade.priceInCents)}</span>
          </p>

          <ul className="flex flex-col gap-2">
            {upgrade.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              className="h-auto min-h-13 w-full whitespace-normal rounded-xl py-3 text-base font-bold"
              disabled={busy}
              onClick={() => onSelect(upgrade.id)}
            >
              {pendingProductId === upgrade.id ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                  Redirecting to secure checkout...
                </>
              ) : (
                `YES! Upgrade to ${upgrade.pageCount} Pages – ${formatPrice(upgrade.priceInCents)}`
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-auto min-h-11 w-full whitespace-normal rounded-xl py-2.5 text-sm font-semibold"
              disabled={busy}
              onClick={() => onSelect(current.id)}
            >
              {pendingProductId === current.id ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Redirecting to secure checkout...
                </>
              ) : (
                `No thanks, continue with ${current.pageCount} pages – ${formatPrice(current.priceInCents)}`
              )}
            </Button>
          </div>

          <SecureBadge className="justify-center" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
