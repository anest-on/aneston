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
    <div className={`${roboto.className} flex flex-col`} lang="en">
      <body className="w-full">{children}</body>
    </div>
  )
}
