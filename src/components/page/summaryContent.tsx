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
import { pacientSubmitProps } from './pacientPage'
import { companionSubmitProps } from './companionPage'
import { cirurgySubmitProps } from './cirurgyPage'

const summaryFormSchema = z.object({
  pacient_name: z.string(),
  pacient_contact: z.string(),
  pacient_observations: z.string().optional(),
})

export type summarySubmitProps = z.infer<typeof summaryFormSchema>

export interface SummaryProps {
  pacientData?: pacientSubmitProps | null
  companionData?: companionSubmitProps | null
  cirurgyData?: cirurgySubmitProps | null
  setObservationsData?: { observation: string } | null
  getSummaryData: (value: summarySubmitProps | null) => void
}

const SummaryContent = ({
  pacientData,
  companionData,
  cirurgyData,
  setObservationsData,
  getSummaryData,
}: SummaryProps) => {
  const form = useForm<z.infer<typeof summaryFormSchema>>({
    resolver: zodResolver(summaryFormSchema),
    defaultValues: {
      pacient_name: pacientData?.pacient_name || '',
      pacient_contact: pacientData?.pacient_number || '',
      pacient_observations: setObservationsData?.observation || '',
    },
  })

  const { isSubmitting } = form.formState

  const handleUpdateProfile = async (data: summarySubmitProps) => {
    getSummaryData(data)
  }

  return (
    <div className="max-w-[572px] mb-20 mx-auto py-0 px-4">
      <div className="flex flex-row items-center justify-center text-[0.8rem] gap-10 mt-8">
        <div className="flex items-center">
          <Calendar size={18} />
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
              name="pacient_name"
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
              name="pacient_contact"
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
              name="pacient_observations"
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

          <div className="flex flex-row w-full justify-between px-5">
            <Button
              variant={'circle'}
              className="w-[150px] rounded-md"
              onClick={() => getSummaryData(null)}
            >
              Voltar
            </Button>
            <Button variant={'default'} className="w-[150px]" type="submit">
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SummaryContent
