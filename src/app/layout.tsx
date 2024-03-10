import type { Metadata } from 'next'

import { roboto } from './fonts'
import './globals.css'
import { NextAuthProvider } from './provider'
import { ThemeProvider } from '@/components/ui/themeProvider'
import { Toaster } from '@/components/ui/toaster'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

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
    <html className={`${roboto.className} flex flex-col `} lang="en">
      <NextAuthProvider>
        <body className="w-full">
          <Toaster />
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
