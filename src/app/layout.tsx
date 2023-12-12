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
    <html className={`${roboto.className} flex flex-col`} lang="en">
      <div className="bg-gray-600 w-full h-[80px] absolute">Header</div>
      <body className="w-full">{children}</body>
    </html>
  )
}
