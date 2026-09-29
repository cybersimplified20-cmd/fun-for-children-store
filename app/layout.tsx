import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka', display: 'swap' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' })

export const metadata: Metadata = {
  title: 'Fun For Children | Printable Coloring Pages for Kids',
  description:
    'Fun printable coloring pages for kids. Download instantly, print at home and choose from hundreds of creative activities.',
  applicationName: 'Fun For Children',
  openGraph: {
    siteName: 'Fun For Children',
    title: 'Fun For Children | Printable Coloring Pages for Kids',
    description:
      'Fun printable coloring pages for kids. Download instantly, print at home and choose from hundreds of creative activities.',
    type: 'website',
  },
  icons: {
    icon: '/images/fun-for-children-logo.jpg',
    shortcut: '/images/fun-for-children-logo.jpg',
    apple: '/images/fun-for-children-logo.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fbf7ee',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-coloring-optimized.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="font-sans antialiased">
        <Script id="meta-pixel-queue" strategy="afterInteractive">
          {`
            !function(f,n){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
            }(window);
            fbq('init', '1556867269062867');
            fbq('track', 'PageView');
          `}
        </Script>
        <Script
          id="meta-pixel-library"
          src="https://connect.facebook.net/en_US/fbevents.js"
          strategy="lazyOnload"
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
