# Stripe Test Deployment Setup

The store is wired for Stripe Checkout and post-payment Google Drive delivery.

## Test Price IDs already identified
- Starter / 500+: `price_1UK4p0LR6i31IfJQkpqTqATo`
- Plus / 1,500+: `price_1UK4pNLR6i31IfJQqcOybLFX`
- Mega / 2,500+: `price_1UK4pkLR6i31IfJQQxjWXHOD`

## Google Drive delivery files
- 500+: `https://drive.google.com/file/d/1FcMP6f0EqGGWgfUBaSTIFG_uRDqrthx8/view?usp=sharing`
- 1,500+: `https://drive.google.com/file/d/17BmocouNM5nVoLVDNpCylCDFkYGn-Kgz/view?usp=sharing`
- 2,500+: `https://drive.google.com/file/d/1lqh0FL0ZDbnKe5LtCNQoDbB1pzU_XudU/view?usp=sharing`

## Vercel environment variables
Add these in Project -> Settings -> Environment Variables:

- `STRIPE_SECRET_KEY` = your `sk_test_...` key (do not commit/share it)
- `STRIPE_WEBHOOK_SECRET` = add after creating the webhook; value starts `whsec_...`
- `STRIPE_STARTER_PRICE_ID` = `price_1UK4p0LR6i31IfJQkpqTqATo`
- `STRIPE_PLUS_PRICE_ID` = `price_1UK4pNLR6i31IfJQqcOybLFX`
- `STRIPE_MEGA_PRICE_ID` = `price_1UK4pkLR6i31IfJQQxjWXHOD`
- `NEXT_PUBLIC_SITE_URL` = your final Vercel URL, e.g. `https://your-project.vercel.app`
- `DRIVE_URL_STARTER` = first Drive link above
- `DRIVE_URL_PLUS` = second Drive link above
- `DRIVE_URL_MEGA` = third Drive link above
- `DOWNLOAD_TOKEN_SECRET` = optional long random string; if omitted, the Stripe secret key is used as the signing base

## Webhook after first deployment
Create a Stripe webhook endpoint at:

`https://YOUR_VERCEL_DOMAIN/api/stripe/webhook`

Enable:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Copy its signing secret (`whsec_...`) to `STRIPE_WEBHOOK_SECRET` in Vercel and redeploy.

## Test flow
Use Stripe Test Mode and a Stripe test card. The success page verifies the Checkout Session with Stripe before exposing a short-lived server link that redirects to the correct Google Drive file.
