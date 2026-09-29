import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import type { ProductId } from '@/lib/products'

export interface DigitalFile {
  id: string
  label: string
  /** Exact pathname inside the connected private Vercel Blob store. */
  blobPath: string
}

const PRODUCT_FILES: Record<ProductId, DigitalFile[]> = {
  starter: [
    {
      id: 'starter-pack',
      label: 'Download Your 500+ Coloring Pages',
      blobPath: '500+ Printable Coloring Pages.zip',
    },
  ],
  plus: [
    {
      id: 'plus-pack',
      label: 'Download Your 1,500+ Coloring Pages',
      blobPath: '1,500+ Printable Coloring Pages.zip',
    },
  ],
  mega: [
    {
      id: 'mega-bundle',
      label: 'Download Your Complete 2,500+ Page Collection',
      blobPath: '2,500+ Coloring Pages.zip',
    },
  ],
}

export { PRODUCT_FILES }

const DOWNLOAD_LINK_TTL_SECONDS = 15 * 60

function getSigningKey() {
  const base = process.env.DOWNLOAD_TOKEN_SECRET ?? process.env.STRIPE_SECRET_KEY
  if (!base) throw new Error('No signing secret available for delivery links')
  return createHmac('sha256', base).update('delivery-link-v3').digest()
}

function sign(payload: string) {
  return createHmac('sha256', getSigningKey()).update(payload).digest('base64url')
}

/** Creates a short-lived site URL tied to one paid Checkout Session and one purchased product. */
export function createSecureDownload(sessionId: string, fileId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + DOWNLOAD_LINK_TTL_SECONDS
  const payload = Buffer.from(JSON.stringify({ s: sessionId, f: fileId, e: expiresAt })).toString('base64url')
  const token = `${payload}.${sign(payload)}`
  return { url: `/api/download?token=${encodeURIComponent(token)}`, expiresAt }
}

export function readDownloadToken(token: string): { sessionId: string; fileId: string } | null {
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  const expected = Buffer.from(sign(payload))
  const received = Buffer.from(signature)
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (typeof data.s !== 'string' || typeof data.f !== 'string' || typeof data.e !== 'number') return null
    if (data.e < Math.floor(Date.now() / 1000)) return null
    return { sessionId: data.s, fileId: data.f }
  } catch {
    return null
  }
}
