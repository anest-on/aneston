import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { JetBrains_Mono, Roboto } from 'next/font/google'
import './globals.css'

export const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})
export const jetBrainsMono = JetBrains_Mono({
  weight: '800',
  subsets: ['latin'],
  variable: '--font-jetBrainsMono',
})

export const metadata: Metadata = {
  title: 'AnestOn',
  description: 'Uma plataforma feita de anestesista para anestesistas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={roboto.className} lang="en">
      <body>{children}</body>
    </html>
  )
}
