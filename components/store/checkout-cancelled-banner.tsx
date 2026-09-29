'use client'

import { useEffect, useState } from 'react'
import { CheckoutCancelledNotice } from '@/components/store/checkout-cancelled-notice'

export function CheckoutCancelledBanner() {
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setCancelled(params.get('checkout') === 'cancelled')
  }, [])

  return cancelled ? <CheckoutCancelledNotice /> : null
}
