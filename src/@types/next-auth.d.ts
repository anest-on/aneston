import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    crm: string
    signature_url: string
    user_link: string
    city: string
    state: string
    avatar_url: string
    password: string
    confirm_password: string
    access_type: string
    easy_scheduling: boolean
    message: string
    doctor_id: string
  }
  interface Session {
    user: User
  }
}
