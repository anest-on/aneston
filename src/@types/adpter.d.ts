import type { AdapterUser as BaseAdapterUser } from "next-auth/adapters";

declare module "@auth/core/adapters" {
  interface AdapterUser extends BaseAdapterUser {
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
    accepted_google_maps: string
  }}