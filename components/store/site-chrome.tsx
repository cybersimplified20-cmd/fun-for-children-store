import Link from 'next/link'
import { Palette } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-xl font-semibold">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Palette className="size-5" aria-hidden="true" />
          </span>
          Fun For Children
        </Link>
        <a
          href="#pricing"
          className="inline-flex h-10 items-center rounded-lg bg-foreground px-4 text-sm font-bold text-background transition-opacity hover:opacity-90"
        >
          Get 2,500+ Pages
        </a>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>{`© ${new Date().getFullYear()} Fun For Children. Printable pages for personal and classroom use.`}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link href="/privacy" className="underline-offset-4 hover:underline">Privacy</Link>
          <Link href="/terms" className="underline-offset-4 hover:underline">Terms</Link>
          <Link href="/refund-policy" className="underline-offset-4 hover:underline">Refunds</Link>
          <span>Payments are processed securely by Stripe.</span>
        </div>
      </div>
    </footer>
  )
}
