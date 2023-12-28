'use client'

import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { MultiStep } from '@/components/multiStep'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const updateProfileSchema = z.object({
  user_link: z
    .string()
    .min(3, { message: 'O link precisa ter pelo menos três letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O link precisa ter apenas letras e hifens.',
    })
    .transform((userLink) => userLink.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  city: z.string(),
  state: z.string().max(2, { message: 'Digite apenas a sigla do estado.' }),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

const Register = () => {
  const session = useSession()
  const router = useRouter()

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      user_link: session.data?.user.user_link || '',
      name: session.data?.user.name || '',
      email: session.data?.user.email || '',
      city: session.data?.user.city || '',
      state: session.data?.user.state || '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const [userLinkAlredyTakenMessage, setUserLinkAlredyTakenMessage] = useState<
    string | null
  >(null)

  const handleUpdateProfile = async (data: UpdateProfileData) => {
    try {
      await api.put('/users', data)
      router.push(`/register/schedule`)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setUserLinkAlredyTakenMessage('Esse nome de usuário já está em uso.')
        return
      }
      console.error(err)
    }
  }

  return (
    <main className="max-w-[572px] mt-20 mb-20 mx-auto py-0 px-4">
      <div className="py-0 px-6">
        <strong className="text-2xl text-white">
          Atualize suas informações
        </strong>
        <p className="mb-6">
          Já coletamos as informações essenciais para criar sua conta com base
          nos dados fornecidos pela sua Conta Google. No entanto, se desejar
          fazer alguma edição em qualquer um desses detalhes, você pode fazê-lo
          imediatamente!
        </p>

        <MultiStep size={4} currentStep={2} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6 gap-4"
        >
          <div className="flex flex-col w-full mr-4">
            <FormField
              control={form.control}
              name="user_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu Link</FormLabel>
                  <FormControl>
                    <Input
                      prefix="aneston.com/"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userLinkAlredyTakenMessage && (
              <p className="text-sm text-[#F75A68] mb-4">
                {userLinkAlredyTakenMessage}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu Nome</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Seu E-mail{' '}
                    <span className="text-gray-200 text-xs">
                      (Caixa que deseja receber as notificações sobre seus
                      pacientes)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex">
            <div className="flex flex-col w-full mr-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sua Cidade</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full mr-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu Estado</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button disabled={!isValid || isSubmitting}>
            Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default Register
