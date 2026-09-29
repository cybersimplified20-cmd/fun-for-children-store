import Link from 'next/link'

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12">
      <Link href="/" className="text-sm font-bold underline underline-offset-4">← Back to store</Link>
      <h1 className="mt-8 font-heading text-4xl font-semibold">Refund Policy</h1>
      <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>Our products are delivered digitally and access is provided immediately after successful payment.</p>
        <p>If you have a technical problem accessing the files, receive the wrong product, or encounter a corrupted download, contact us so we can help resolve the issue.</p>
        <p>Refund requests are reviewed individually where required by applicable consumer law. Nothing in this policy limits rights that cannot legally be excluded.</p>
        <p>A public support email will be added here once configured.</p>
      </div>
    </main>
  )
}
