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

const loginSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa ter pelo menos seis caracteres.' }),
})

type LoginData = z.infer<typeof loginSchema>
export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  })

  const { isSubmitting } = form.formState

  const login = async (data: LoginData) => {
    // try {
    //   await api.put('/users', data)
    //   router.push(`/register/time-intervals`)
    // } catch (err) {
    //   if (err instanceof AxiosError && err?.response?.data?.message) {
    //     setUserLinkAlredyTakenMessage('Esse nome de usuário já está em uso.')
    //     return
    //   }
    //   console.error(err)
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(login)}
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

        <Button disabled={isSubmitting}>Entrar</Button>
      </form>
    </Form>
  )
}
