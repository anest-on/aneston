'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { login } from '@/actions/login'
import { useState } from 'react'

const loginSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa ter pelo menos seis caracteres.' }),
  doctor_id: z.string(),
})

type LoginData = z.infer<typeof loginSchema>
type doctorId = string
export const LoginForm = ({ doctorId }: { doctorId: doctorId }) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      doctor_id: '',
    },
  })

  const { isSubmitting } = form.formState

  const [error, setError] = useState<string | undefined>('')

  const onSubmit = async (values: LoginData) => {
    setError('')

    values.doctor_id = doctorId
    login(values).then((data) => {
      setError(data?.error)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6 gap-4"
      >
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="text-sm text-red-500">{error}</div>

        <Button className="mt-2" disabled={isSubmitting}>
          Entrar
        </Button>
      </form>
    </Form>
  )
}
