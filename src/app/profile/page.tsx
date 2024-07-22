'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { statesList } from '../constants/constants'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { SignatureDoctor } from '@/components/signatureDoctor'
import { User } from '@prisma/client'

const updateProfileSchema = z.object({
  user_link: z
    .string()
    .min(3, { message: 'O link precisa ter pelo menos três letras.' })
    .regex(/^([a-zA-Z0-9\-_]+)$/, {
      message:
        'O código link pode conter apenas letras (maiúsculas e minúsculas), números, hífens ou underscores.',
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

  const [open, setOpen] = useState(false)
  const [doctor, setDoctor] = useState({} as User)

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

      setDoctor(userData)

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
            <div className="flex">
              <div className="flex flex-col  w-full mr-4">
                <FormField
                  control={form.control}
                  name="crm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu CRM</FormLabel>
                      <FormControl>
                        <Input disabled={isSubmitting} type="crm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-[30%]">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado:</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-900 border-none">
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-[1px] border-gray-600">
                          <SelectGroup>
                            {statesList.map((state, index) => (
                              <SelectItem value={state} key={index}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

            <div className="flex flex-col w-full mr-4">
              <FormField
                control={form.control}
                name="user_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu Link</FormLabel>
                    <FormControl>
                      <Input
                        prefix="aneston.com/form/"
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

            {((session && session.user.accessType === '') ||
              (session && session.user.accessType === null) ||
              (session && session.user.accessType === undefined)) && (
              <div className="flex flex-col my-4 gap-1 border rounded-md border-gray-600 p-2">
                <div className="md:flex gap-10">
                  <p className="text-white font-bold">Assinatura</p>
                </div>
                <p>
                  Assinatura que ficará registrada no Comprovante de Realização
                  de Consulta Pré-anestésica.
                </p>

                {doctor?.signature_url ? (
                  <div className="flex flex-col md:flex-row items-center justify-between px-4 mt-4 gap-4">
                    <div className="w-[300px] h-[150px] self-center md:self-start  bg-white flex border-gray-900 border-1">
                      <Image
                        src={doctor?.signature_url}
                        alt="signature"
                        width={300}
                        height={150}
                      />
                    </div>
                    <div className="mt-2 md:mt-0 md:mr-12">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button variant={'outline'}>
                            Alterar assinatura
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="flex flex-col w-[400px] h-[300px] justify-start bg-gray-800 border-gray-600 text-gray-200">
                          <p className="font-bold">
                            Realize aqui a sua nova assinatura
                          </p>
                          <div className="self-center w-[300px] h-[150px] ">
                            <SignatureDoctor
                              setOpen={setOpen}
                              onSave={fetchUserData}
                              navigateTo="/profile"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-4 mt-4 gap-4">
                    <p className="text-center text-white font-bold">
                      Você ainda não cadastrou uma assinatura!
                    </p>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant={'outline'}>
                          Cadastrar assinatura
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="flex flex-col w-[400px] h-[300px] justify-start bg-gray-800 border-gray-600 text-gray-200">
                        <p className="font-bold">
                          Realize aqui a sua assinatura
                        </p>
                        <div className="self-center w-[300px] h-[150px] ">
                          <SignatureDoctor
                            setOpen={setOpen}
                            onSave={fetchUserData}
                            navigateTo="/profile"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            )}

            <Button disabled={isSubmitting || !doctor.signature_url}>
              Salvar
            </Button>
          </form>
        </Form>
      </main>
    </>
  )
}

export default Profile
