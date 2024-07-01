'use client'

import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
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
import { Header } from '@/components/header'
import Image from 'next/image'
import { useToast } from '@/components/ui/use-toast'

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
  crm: z.string(),
  city: z.string(),
  state: z.string().max(2, { message: 'Digite apenas a sigla do estado.' }),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

const Profile = () => {
  const { toast } = useToast()
  const { data: session, update } = useSession()

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      user_link: session?.user.user_link || '',
      name: session?.user.name || '',
      email: session?.user.email || '',
      crm: session?.user.crm || '',
      city: session?.user.city || '',
      state: session?.user.state || '',
    },
  })

  const { isSubmitting } = form.formState

  const [userLinkAlredyTakenMessage, setUserLinkAlredyTakenMessage] = useState<
    string | null
  >(null)

  // Função para buscar os dados do usuário quando a página é carregada
  const fetchUserData = async () => {
    try {
      const response = await api.get('/doctor')
      const userData = response.data

      form.setValue('user_link', userData.user_link)
      form.setValue('name', userData.name)
      form.setValue('email', userData.email)
      form.setValue('crm', userData.crm)
      form.setValue('city', userData.city)
      form.setValue('state', userData.state)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleUpdateProfile = async (data: UpdateProfileData) => {
    try {
      await api.put('/users', data)

      // Busque os dados atualizados do banco de dados
      await fetchUserData()

      // Atualiza a sessão do usuário para refletir as mudanças
      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            user_link: data.user_link,
            name: data.name,
            email: data.email,
            crm: data.crm,
            city: data.city,
            state: data.state,
          },
        })
      }

      toast({
        title: 'Perfil atualizado com sucesso!',
        variant: 'success',
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        setUserLinkAlredyTakenMessage('Esse nome de usuário já está em uso.')
      }
      toast({
        title: 'Erro ao atualizar perfil!',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <Header />

      <main className="max-w-[572px] mt-20 mb-20 mx-auto py-0 px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateProfile)}
            className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6 gap-4"
          >
            <div className="flex flex-col w-full mr-4">
              <div className="flex w-full justify-center mb-5">
                {session?.user.avatar_url && (
                  <Image
                    src={session.user.avatar_url}
                    alt=""
                    width={88}
                    height={88}
                    className="rounded-full"
                  />
                )}
              </div>
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
                    <FormLabel>Seu nome</FormLabel>
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
                name="crm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CRM</FormLabel>
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

            <Button disabled={isSubmitting}>Salvar</Button>
          </form>
        </Form>
      </main>
    </>
  )
}

export default Profile
