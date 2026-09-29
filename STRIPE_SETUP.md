# Stripe + Private Vercel Blob Setup

The store uses Stripe Checkout and protected post-payment downloads from a private Vercel Blob store.

## Stripe Price IDs
- Starter / 500+: `price_1UK4p0LR6i31IfJQkpqTqATo`
- Plus / 1,500+: `price_1UK4pNLR6i31IfJQqcOybLFX`
- Mega / 2,500+: `price_1UK4pkLR6i31IfJQQxjWXHOD`

## Upload these ZIPs to the project's PRIVATE Blob store

Use these exact Blob pathnames:

- `products/starter/500-plus-printable-coloring-pages.zip`
- `products/plus/1500-plus-printable-coloring-pages.zip`
- `products/mega/ultimate-2500-printable-coloring-pages-mega-bundle.zip`

The current source files are:
- `500+ Printable Coloring Pages.zip`
- `1,500+ Printable Coloring Pages.zip`
- `2,500+ Coloring Pages.zip`

## How delivery works

1. Customer pays through Stripe Checkout.
2. Stripe redirects to `/success?session_id=...`.
3. The site verifies the Checkout Session directly with Stripe.
4. The success page creates a short-lived site download link.
5. Clicking the button verifies Stripe again.
6. The server mints a short-lived GET-only signed Vercel Blob URL for the purchased ZIP.
7. Vercel Blob serves the ZIP directly to the buyer.

The Blob object is private, so knowing the pathname alone is not enough to download it.

## Vercel requirements

Connect one PRIVATE Vercel Blob store to this project. New Vercel Blob connections use OIDC by default, so the deployed app can authenticate without exposing a long-lived token.

Existing Stripe environment variables still required:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_STARTER_PRICE_ID`
- `STRIPE_PLUS_PRICE_ID`
- `STRIPE_MEGA_PRICE_ID`
- `NEXT_PUBLIC_SITE_URL`
- `DOWNLOAD_TOKEN_SECRET` (recommended)

The old `DRIVE_URL_STARTER`, `DRIVE_URL_PLUS`, and `DRIVE_URL_MEGA` variables are no longer used by the site after this change.

## Stripe webhook

Endpoint:
`https://YOUR_VERCEL_DOMAIN/api/stripe/webhook`

Events:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
