import { Info } from 'lucide-react'

export function CheckoutCancelledNotice() {
  return (
    <div role="status" className="bg-secondary px-4 py-3 text-secondary-foreground">
      <p className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-sm font-semibold">
        <Info className="size-4 shrink-0" aria-hidden="true" />
        Checkout was cancelled and you have not been charged. Your pages are waiting whenever you&apos;re ready.
      </p>
    </div>
  )
}
