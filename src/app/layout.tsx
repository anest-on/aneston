import type { Metadata } from 'next'

import { roboto } from './fonts'
import './globals.css'

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
