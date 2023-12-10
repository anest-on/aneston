import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { JetBrains_Mono, Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})
const jetBrainsMono = JetBrains_Mono({
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
    <html lang="en">
      <body className={(roboto.className, jetBrainsMono.className)}>
        {children}
      </body>
    </html>
  )
}
