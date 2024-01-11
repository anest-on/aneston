import type { Metadata } from 'next'

import { roboto } from './fonts'
import './globals.css'
import { NextAuthProvider } from './provider'
import { ThemeProvider } from '@/components/ui/themeProvider'

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
      <NextAuthProvider>
        <body className="w-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </NextAuthProvider>
    </html>
  )
}
