import Link from 'next/link'

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12">
      <Link href="/" className="text-sm font-bold underline underline-offset-4">← Back to store</Link>
      <h1 className="mt-8 font-heading text-4xl font-semibold">Terms of Service</h1>
      <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
        <p>Fun For Children sells digital printable activity and coloring products. By purchasing, you receive access to the digital files described on the product page.</p>
        <p>Products are for personal and classroom use unless a different licence is stated. Files may not be resold, redistributed, uploaded for public download or represented as your own product.</p>
        <p>Because products are digital, no physical item is shipped. Access is provided after successful payment through the confirmation page.</p>
        <p>You are responsible for having compatible software, a suitable device and printing equipment where needed.</p>
        <p>These terms may be updated as the store develops. A public support email will be added here once configured.</p>
      </div>
    </main>
  )
}
