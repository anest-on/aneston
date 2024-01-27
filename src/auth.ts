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
  accepted_google_maps: string
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
        session.user.accessType = token.accessType
      }

      if (token.avatar_url && session.user) {
        session.user.avatar_url = token.avatar_url
      }

      if (token.accepted_google_maps && session.user) {
        session.user.accepted_google_maps = token.accepted_google_maps
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token
      token.accessType = existingUser.access_type
      token.avatar_url = existingUser.avatar_url
      token.accepted_google_maps = existingUser.accepted_google_maps

      return token
    },
  },
  adapter: PrismaAdapter(),
  session: { strategy: 'jwt' },
  ...authConfig,
})
