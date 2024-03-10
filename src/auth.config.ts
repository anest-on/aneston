/* eslint-disable camelcase */
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { LoginSchema } from './schemas'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          user_link: '',
          city: '',
          state: '',
          avatar_url: profile.picture,
          access_type: '',
          doctor_id: '',
          password: '',
          confirm_password: '',
        }
      },
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
        doctor_id: { label: 'doctor_id', type: 'text' },
      },
      async authorize(credentials) {
        const validadedFields = LoginSchema.safeParse(credentials)

        if (validadedFields.success) {
          const { email, password, doctor_id } = validadedFields.data

          const user = await prisma.user.findFirst({
            where: {
              email,
              doctor_id,
            },
          })

          if (!user) {
            return null
          }

          let passwordMatch = null

          if (user.password) {
            passwordMatch = await bcrypt.compare(password, user.password)
          }

          if (passwordMatch === false) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            user_link: user.user_link ? user.user_link : '',
            city: user.city ? user.city : '',
            state: user.state ? user.state : '',
            avatar_url: user.avatar_url ? user.avatar_url : '',
            access_type: user.access_type ? user.access_type : '',
            password: user.password ? user.password : '',
            confirm_password: user.confirm_password
              ? user.confirm_password
              : '',
            doctor_id: user.doctor_id ? user.doctor_id : '',
            created_at: user.created_at,
            updated_at: user.updated_at,
          }
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
