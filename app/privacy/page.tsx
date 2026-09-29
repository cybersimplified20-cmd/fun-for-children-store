import Link from 'next/link'

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12">
      <Link href="/" className="text-sm font-bold underline underline-offset-4">← Back to store</Link>
      <h1 className="mt-8 font-heading text-4xl font-semibold">Privacy Policy</h1>
      <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>Fun For Children collects only the information needed to process purchases, deliver digital products, provide customer support and operate the website.</p>
        <p>Payments are processed by Stripe. We do not receive or store full card details. Stripe may process payment, billing and fraud-prevention information under its own privacy practices.</p>
        <p>We may use website analytics and advertising measurement tools to understand visits, purchases and campaign performance. These tools may use cookies or similar technologies where permitted.</p>
        <p>We do not sell customer personal information. Information may be shared with service providers only when necessary to operate the store, process payments, deliver files or comply with legal obligations.</p>
        <p>You may contact us to request access, correction or deletion of personal information where applicable. A public support email will be added here once configured.</p>
      </div>
    </main>
  )
}
