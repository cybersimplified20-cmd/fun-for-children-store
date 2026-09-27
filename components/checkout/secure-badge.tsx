import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SecureBadge({ className }: { className?: string }) {
  return (
    <p className={cn('flex items-center gap-1.5 text-xs text-muted-foreground', className)}>
      <Lock className="size-3.5" aria-hidden="true" />
      Secure checkout powered by Stripe
    </p>
  )
}
