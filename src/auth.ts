import NextAuth, { AuthError, DefaultSession } from 'next-auth'
import { PrismaAdapter } from './lib/auth/prisma-adapter'

import { getUserById } from './datat/user'
import authConfig from './auth.config'
import { api } from './lib/axios'

type ExtendedUser = DefaultSession['user'] & {
  id: string
  name: string
  email: string
  user_link: string
  city: string
  state: string
  avatar_url: string
  password: string
  confirm_password: string
  accessType: 'OWNER' | 'FULL_ACCESS' | 'DASHBOARD_ACCESS'
  doctor_id: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === 'google') {
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/?error=permissions'
          // return false
        }
      }
      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.accessType && session.user) {
        if (
          token.accessType === 'FULL_ACCESS' ||
          token.accessType === 'OWNER' ||
          token.accessType === 'DASHBOARD_ACCESS'
        ) {
          session.user.accessType = token.accessType
        }
      }

      if (
        token.avatar_url &&
        session.user &&
        typeof token.avatar_url === 'string'
      ) {
        session.user.avatar_url = token.avatar_url
      }

      if (
        token.user_link &&
        session.user &&
        typeof token.user_link === 'string'
      ) {
        session.user.user_link = token.user_link
      }

      if (token.state && session.user && typeof token.state === 'string') {
        session.user.state = token.state
      }

      if (token.city && session.user && typeof token.city === 'string') {
        session.user.city = token.city
      }

      if (
        token.doctor_id &&
        session.user &&
        typeof token.doctor_id === 'string'
      ) {
        session.user.doctor_id = token.doctor_id
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token
      token.accessType = existingUser.access_type
      token.avatar_url = existingUser.avatar_url
      token.user_link = existingUser.user_link
      token.state = existingUser.state
      token.city = existingUser.city
      token.doctor_id = existingUser.doctor_id

      return token
    },
  },
  adapter: PrismaAdapter(),
  session: { strategy: 'jwt' },
  ...authConfig,
})
