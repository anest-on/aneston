/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type Adapter } from '@auth/core/adapters'
import { db } from '../db'

export function PrismaAdapter(): Adapter {
  const prisma = db
  return {
    async createUser(user) {
      const prismaUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          user_link: user.user_link!,
          city: user.city!,
          state: user.state!,
          avatar_url: user.avatar_url!,
          password: user.password!,
          confirm_password: user.confirm_password!,
          access_type: user.access_type!,
          doctor_id: user.doctor_id!,
          accepted_google_maps: user.accepted_google_maps!,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        user_link: prismaUser.user_link!,
        city: prismaUser.city!,
        state: prismaUser.state!,
        avatar_url: prismaUser.avatar_url!,
        password: user.password!,
        confirm_password: user.confirm_password!,
        access_type: user.access_type!,
        doctor_id: user.doctor_id!,
        emailVerified: null,
        accepted_google_maps: user.accepted_google_maps!,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        user_link: user.user_link!,
        city: user.city!,
        state: user.state!,
        avatar_url: user.avatar_url!,
        password: user.password!,
        confirm_password: user.confirm_password!,
        access_type: user.access_type!,
        doctor_id: user.doctor_id!,
        emailVerified: null,
        accepted_google_maps: user.accepted_google_maps!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        user_link: user.user_link!,
        city: user.city!,
        state: user.state!,
        avatar_url: user.avatar_url!,
        password: user.password!,
        confirm_password: user.confirm_password!,
        access_type: user.access_type!,
        doctor_id: user.doctor_id!,
        emailVerified: null,
        accepted_google_maps: user.accepted_google_maps!,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        user_link: user.user_link!,
        city: user.city!,
        state: user.state!,
        avatar_url: user.avatar_url!,
        password: user.password!,
        confirm_password: user.confirm_password!,
        access_type: user.access_type!,
        doctor_id: user.doctor_id!,
        emailVerified: null,
        accepted_google_maps: user.accepted_google_maps!,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          user_link: user.user_link,
          city: user.city,
          state: user.state,
          avatar_url: user.avatar_url,
          password: user.password!,
          confirm_password: user.confirm_password!,
          access_type: user.access_type!,
          doctor_id: user.doctor_id!,
          accepted_google_maps: user.accepted_google_maps!,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        user_link: prismaUser.user_link!,
        city: prismaUser.city!,
        state: prismaUser.state!,
        avatar_url: prismaUser.avatar_url!,
        password: user.password!,
        confirm_password: user.confirm_password!,
        access_type: user.access_type!,
        doctor_id: user.doctor_id!,
        emailVerified: null,
        accepted_google_maps: user.accepted_google_maps!,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          providerAccountId: account.providerAccountId,
          provider: account.provider,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      // await prisma.session.create({
      //   data: {
      //     user_id: userId,
      //     expires,
      //     session_token: sessionToken,
      //   },
      // })

      return {
        userId,
        expires,
        sessionToken,
      }
    },

    // async getSessionAndUser(sessionToken) {
    //   // const prismaSession = await prisma.session.findUnique({
    //   //   where: {
    //   //     session_token: sessionToken,
    //   //   },
    //   //   include: {
    //   //     user: true,
    //   //   },
    //   // })
    //   // if (!prismaSession) {
    //   //   return null
    //   // }
    //   // const { user, ...session } = prismaSession
    //   // return {
    //   //   session: {
    //   //     userId: session.user_id,
    //   //     expires: session.expires,
    //   //     sessionToken: session.session_token,
    //   //   },
    //   // user: {
    //   //   id: user.id,
    //   //   name: user.name,
    //   //   email: user.email,
    //   //   user_link: user.user_link!,
    //   //   city: user.city!,
    //   //   state: user.state!,
    //   //   avatar_url: user.avatar_url!,
    //   //   password: user.password!,
    //   //   confirm_password: user.confirm_password!,
    //   //   access_type: user.access_type!,
    //   //   doctor_id: user.doctor_id!,
    //   //   emailVerified: null,
    //   // },
    //   // }
    // },

    // async updateSession({ sessionToken, userId, expires }) {
    //   const prismaSession = await prisma.session.update({
    //     where: {
    //       session_token: sessionToken,
    //     },
    //     data: {
    //       expires,
    //       user_id: userId,
    //     },
    //   })

    //   return {
    //     sessionToken: prismaSession.session_token,
    //     userId: prismaSession.user_id,
    //     expires: prismaSession.expires,
    //   }
    // },

    //   async deleteSession(sessionToken) {
    //     await prisma.session.delete({
    //       where: {
    //         session_token: sessionToken,
    //       },
    //     })
    //   },
  }
}
