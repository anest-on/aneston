/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
        doctor_id: { label: 'doctor_id', type: 'text' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const thirdPartyUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
            doctor_id: credentials.doctor_id,
          },
        })

        if (!thirdPartyUser) {
          return null
        }

        let passwordMatch = null

        if (thirdPartyUser.password) {
          passwordMatch = await bcrypt.compare(
            credentials.password,
            thirdPartyUser.password,
          )
        }

        if (!passwordMatch) {
          return null
        }

        return thirdPartyUser
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          user_link: '',
          city: '',
          state: '',
          avatar_url: profile.picture,
          password: '',
          confirm_password: '',
          access_type: 'OWNER',
          doctor_id: '',
        }
      },
    }),
  ],

  // session: {
  //   strategy: 'jwt',
  // },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'google') {
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/?error=permissions'
        }
      }

      const session_token = randomUUID()

      const todayDate = new Date()
      const nextweek = new Date(todayDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      const prismaAdapter = PrismaAdapter()

      prismaAdapter &&
        prismaAdapter.createSession({
          sessionToken: session_token,
          userId: user.id,
          expires: nextweek,
        })

      return true
    },

    async jwt({ token }) {
      console.log('TOKEN:' + token)
      return token
    },

    async session({ session, user, token }) {
      return {
        ...session,
        token,
        user,
      }
    },
  },
}
