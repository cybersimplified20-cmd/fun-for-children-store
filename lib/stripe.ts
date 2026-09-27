import 'server-only'
import Stripe from 'stripe'

// STRIPE KEYS: set STRIPE_SECRET_KEY in Settings -> Vars (never prefix it with NEXT_PUBLIC_).
// Use your sk_test_... key for Test Mode, then swap in your sk_live_... key to go live.
const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(secretKey)
