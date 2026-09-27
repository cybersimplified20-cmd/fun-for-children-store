'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { CircleCheck, Clock, Download, Loader2, ShieldAlert } from 'lucide-react'
import type { VerifyResponse } from '@/app/api/checkout/verify/route'

const fetcher = async (url: string): Promise<VerifyResponse> => {
  const response = await fetch(url, { cache: 'no-store' })
  return (await response.json()) as VerifyResponse
}

export function PurchaseVerification({ sessionId }: { sessionId: string }) {
  const { data, error, isLoading } = useSWR(
    sessionId ? `/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      // Poll while Stripe is still confirming (e.g. bank transfers). Refresh paid links before they expire.
      refreshInterval: (latest) =>
        latest?.status === 'pending' ? 3000 : latest?.status === 'paid' ? 10 * 60 * 1000 : 0,
    },
  )

  if (!sessionId || data?.status === 'invalid') {
    return (
      <StatusCard
        icon={<ShieldAlert className="size-7" aria-hidden="true" />}
        tone="error"
        title="We couldn't find that order"
        body="This link is missing a valid order reference. If you've paid, check your email receipt or contact us and we'll sort it out."
      />
    )
  }

  if (isLoading || !data) {
    if (error) {
      return (
        <StatusCard
          icon={<ShieldAlert className="size-7" aria-hidden="true" />}
          tone="error"
          title="We couldn't confirm your payment right now"
          body="Please refresh this page in a moment. You have not been charged twice."
        />
      )
    }
    return (
      <StatusCard
        icon={<Loader2 className="size-7 animate-spin" aria-hidden="true" />}
        tone="neutral"
        title="Verifying your payment..."
        body="Confirming your order securely with Stripe. This only takes a second."
      />
    )
  }

  if (data.status === 'pending') {
    return (
      <StatusCard
        icon={<Clock className="size-7" aria-hidden="true" />}
        tone="neutral"
        title="Your payment is being confirmed"
        body="Some payment methods take a little longer. Keep this page open and your downloads will appear automatically."
      />
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <CircleCheck className="size-8" aria-hidden="true" />
        </span>
        <h1 className="font-heading text-3xl font-semibold text-balance sm:text-4xl">
          Thank you for your purchase!
        </h1>
        <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
          Your payment for the <strong className="text-foreground">{data.product.name}</strong> is
          confirmed.
          {data.email ? ` A receipt has been sent to ${data.email}.` : null}
        </p>
      </div>

      <section aria-labelledby="downloads-title" className="flex flex-col gap-4 rounded-3xl border bg-card p-6 sm:p-8">
        <h2 id="downloads-title" className="font-heading text-xl font-semibold">
          {data.product.downloadHeadline}
        </h2>
        <ul className="flex flex-col gap-3">
          {data.downloads.map((file) => (
            <li key={file.id}>
              <a
                href={file.url}
                className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-center text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Download className="size-5 shrink-0" aria-hidden="true" />
                {file.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Download links are private to your order and refresh automatically while this page is open.
          Bookmark this page to download again later.
        </p>
      </section>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/" className="font-bold text-foreground underline underline-offset-4">
          Back to the store
        </Link>
      </p>
    </div>
  )
}

function StatusCard({
  icon,
  title,
  body,
  tone,
}: {
  icon: React.ReactNode
  title: string
  body: string
  tone: 'neutral' | 'error'
}) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 rounded-3xl border bg-card p-8 text-center sm:p-12">
      <span
        className={
          tone === 'error'
            ? 'flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive'
            : 'flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground'
        }
      >
        {icon}
      </span>
      <h1 className="font-heading text-2xl font-semibold text-balance">{title}</h1>
      <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{body}</p>
      {tone === 'error' ? (
        <Link href="/" className="text-sm font-bold underline underline-offset-4">
          Back to the store
        </Link>
      ) : null}
    </div>
  )
}
