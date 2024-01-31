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
    password: string
    confirm_password: string
    access_type: string
    doctor_id: string
  }
  interface Session {
    user: User
  }
}
