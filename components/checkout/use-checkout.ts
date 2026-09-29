'use client'

import { useCallback, useRef, useState } from 'react'
import { PRODUCTS, type ProductId } from '@/lib/products'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

type CheckoutState =
  | { status: 'idle' }
  | { status: 'loading'; productId: ProductId }
  | { status: 'redirecting'; productId: ProductId; url: string; blockedPopup: boolean }
  | { status: 'error'; message: string }

export function useCheckout() {
  const [state, setState] = useState<CheckoutState>({ status: 'idle' })
  const inFlight = useRef(false)

  const startCheckout = useCallback(async (productId: ProductId) => {
    if (inFlight.current) return
    inFlight.current = true
    setState({ status: 'loading', productId })

    const attemptId = crypto.randomUUID()

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, attemptId }),
      })
      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string }

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'We could not start checkout. Please try again.')
      }

      const product = PRODUCTS[productId]
      if (typeof window.fbq === 'function') {
        window.fbq(
          'track',
          'InitiateCheckout',
          {
            value: product.priceInCents / 100,
            currency: 'EUR',
            content_ids: [productId],
            content_name: product.name,
            content_type: 'product',
            num_items: 1,
          },
          { eventID: attemptId },
        )
      }

      // Stripe Checkout cannot render inside an iframe (e.g. an embedded preview), so open a new tab there.
      if (window.self !== window.top) {
        const opened = window.open(data.url, '_blank', 'noopener')
        setState({ status: 'redirecting', productId, url: data.url, blockedPopup: !opened })
        inFlight.current = false
        return
      }

      setState({ status: 'redirecting', productId, url: data.url, blockedPopup: false })
      window.location.assign(data.url)
    } catch (error) {
      inFlight.current = false
      const message =
        error instanceof TypeError
          ? 'Network error. Please check your connection and try again.'
          : (error as Error).message
      setState({ status: 'error', message })
    }
  }, [])

  const reset = useCallback(() => {
    inFlight.current = false
    setState({ status: 'idle' })
  }, [])

  return { state, startCheckout, reset }
}
