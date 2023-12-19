import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    user_link: string
    city: string
    state: string
    avatar_url: string
  }
}
