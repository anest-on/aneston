/* eslint-disable @next/next/no-async-client-component */

import CalendarIntermediary from '@/components/page/calendarIntermediary'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { prisma } from '@/lib/prisma'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Clock } from 'lucide-react'
import { Textarea } from '../ui/textarea'

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

const SummaryContent = () => {
  const session = useSession()

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

  const { isSubmitting } = form.formState

  const [userLinkAlredyTakenMessage, setUserLinkAlredyTakenMessage] = useState<
    string | null
  >(null)

  const handleUpdateProfile = async (data: UpdateProfileData) => {
    console.log(data)
  }

  return (
    <div className="max-w-[572px] mb-20 mx-auto py-0 px-4">
      <div className="flex flex-row items-center justify-center text-[0.8rem] gap-10 mt-8">
        <div className="flex items-center">
          <Calendar size={18} />{' '}
          <p className="ml-1 text-gray-100">22 de setembro de 2023</p>
        </div>
        <div className="flex items-center">
          <Clock size={18} /> <p className="ml-1 text-gray-100">11:00</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="flex flex-col gap-5 mt-5"
        >
          <div className="flex flex-col w-full mr-4">
            <FormField
              control={form.control}
              name="user_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do paciente</FormLabel>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contato</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col min-w-[350px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isSubmitting}>Enviar formulário</Button>
        </form>
      </Form>
    </div>
  )
}

export default SummaryContent
