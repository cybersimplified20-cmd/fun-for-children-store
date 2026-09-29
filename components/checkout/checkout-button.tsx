'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCheckout } from '@/components/checkout/use-checkout'
import type { ProductId } from '@/lib/products'
import { cn } from '@/lib/utils'

export function CheckoutButton({
  productId,
  label,
  loadingLabel = 'Opening secure checkout...',
  className,
  showError = true,
}: {
  productId: ProductId
  label: string
  loadingLabel?: string
  className?: string
  showError?: boolean
}) {
  const { state, startCheckout } = useCheckout()
  const loading =
    (state.status === 'loading' || state.status === 'redirecting') &&
    state.productId === productId &&
    !(state.status === 'redirecting' && state.blockedPopup)

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        size="lg"
        className={cn('h-13 w-full rounded-xl font-bold', className)}
        disabled={loading}
        onClick={() => void startCheckout(productId)}
      >
        {loading ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            {loadingLabel}
          </>
        ) : (
          label
        )}
      </Button>

      {state.status === 'redirecting' && state.productId === productId && state.blockedPopup ? (
        <a
          href={state.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm font-bold underline underline-offset-4"
        >
          Open secure checkout
        </a>
      ) : null}

      {showError && state.status === 'error' ? (
        <p role="alert" className="text-center text-xs text-destructive">
          {state.message}
        </p>
      ) : null}
    </div>
  )
}
