'use client'
import { SessionProvider } from 'next-auth/react'

// Crie o contexto

type Props = {
  children?: React.ReactNode
}

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}
