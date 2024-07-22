'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { statesList } from '@/app/constants/constants'
import { MultiStep } from '@/components/multiStep'
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
import { AxiosError } from 'axios'
import { ArrowRight } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

const Register = () => {
  const session = useSession()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [doctor, setDoctor] = useState({} as User)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      user_link: session.data?.user.user_link || nanoid(),
      name: session.data?.user.name || '',
      email: session.data?.user.email || '',
      crm: session.data?.user.crm || '',
      city: session.data?.user.city || '',
      state: session.data?.user.state || '',
    },
  })

  const fetchUserData = async () => {
    try {
      const response = await api.get('/doctor')
      const userData = response.data

      setDoctor(userData)

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

  const { isSubmitting } = form.formState

  const [userLinkAlredyTakenMessage, setUserLinkAlredyTakenMessage] = useState<
    string | null
  >(null)

  const handleUpdateProfile = async (data: UpdateProfileData) => {
    try {
      await api.put('/users', data)
      toast({
        title: 'Cadastro realizado com sucesso!',
        variant: 'success',
      })
      await session.update((session: any) => ({
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
      }))
      router.push('/')
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
          nos dados fornecidos pela sua Conta Google. No entanto necessitamos,
          se desejar fazer alguma edição em qualquer um desses detalhes, você
          pode fazê-lo imediatamente!
        </p>
      </div>
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

          {((session && session.data?.user.accessType === '') ||
            (session && session.data?.user.accessType === null) ||
            (session && session.data?.user.accessType === undefined)) && (
            <div className="flex flex-col my-4 gap-1 border rounded-md border-gray-600 p-2">
              <div className="md:flex gap-10">
                <p className="text-white font-bold">Assinatura</p>
              </div>
              <p>
                Assinatura que ficará registrada no Comprovante de Realização de
                Consulta Pré-anestésica.
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
                        <Button variant={'outline'}>Alterar assinatura</Button>
                      </DialogTrigger>
                      <DialogContent className="flex flex-col w-[400px] h-[300px] justify-start bg-gray-800 border-gray-600 text-gray-200">
                        <p className="font-bold">
                          Realize aqui a sua nova assinatura
                        </p>
                        <div className="self-center w-[300px] h-[150px] ">
                          <SignatureDoctor
                            setOpen={setOpen}
                            onSave={fetchUserData}
                            navigateTo="/register/update-informations"
                            crm={form.getValues('crm')}
                            state={form.getValues('state')}
                            userLink={form.getValues('user_link')}
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
                      <Button variant={'outline'}>Cadastrar assinatura</Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col w-[400px] h-[300px] justify-start bg-gray-800 border-gray-600 text-gray-200">
                      <p className="font-bold">Realize aqui a sua assinatura</p>
                      <div className="self-center w-[300px] h-[150px] ">
                        <SignatureDoctor
                          setOpen={setOpen}
                          onSave={fetchUserData}
                          navigateTo="/register/update-informations"
                          crm={form.getValues('crm')}
                          state={form.getValues('state')}
                          userLink={form.getValues('user_link')}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !session.data?.user.signature_url}
          >
            Finalizar Inscrição
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default Register
