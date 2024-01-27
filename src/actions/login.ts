/* eslint-disable camelcase */
'use server'

import * as z from 'zod'

import { signIn } from '@/auth'
import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validadedFields = LoginSchema.safeParse(values)

  if (!validadedFields.success) {
    return { error: 'Campos inválidos!' }
  }

  const { email, password, doctor_id } = validadedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      doctor_id,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Senha ou E-mail inválidos' }
        default:
          return { error: 'Alguma coisa deu errado' }
      }
    }

    throw error
  }
}
