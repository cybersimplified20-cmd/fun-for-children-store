# Google Drive delivery links — ready

The site is already coded so these links are delivered only after a Stripe Checkout Session is verified as paid.

- Starter (500+): `https://drive.google.com/file/d/1FcMP6f0EqGGWgfUBaSTIFG_uRDqrthx8/view?usp=sharing`
- Plus (1,500+): `https://drive.google.com/file/d/17BmocouNM5nVoLVDNpCylCDFkYGn-Kgz/view?usp=sharing`
- Mega (2,500+): `https://drive.google.com/file/d/1lqh0FL0ZDbnKe5LtCNQoDbB1pzU_XudU/view?usp=sharing`

> Note: the third link was supplied with the label "1,500+" too. It has been assigned to Mega (2,500+) based on its position in the list. Change `DRIVE_URL_MEGA` if that was not intended.

## Still needed for live payments

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_STARTER_PRICE_ID`
- `STRIPE_PLUS_PRICE_ID`
- `STRIPE_MEGA_PRICE_ID`
- `NEXT_PUBLIC_SITE_URL`
- `DOWNLOAD_TOKEN_SECRET` (recommended)
