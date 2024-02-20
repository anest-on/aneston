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
import { api } from '@/lib/axios'
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
  pacientData: pacientSubmitProps | null
  companionData: companionSubmitProps | null
  cirurgyData: cirurgySubmitProps | null
  setObservationsData?: { observation: string } | null
  getSummaryData: (value: summarySubmitProps | null) => void
  doctorLink?: string
}

const SummaryContent = ({
  pacientData,
  companionData,
  cirurgyData,
  setObservationsData,
  getSummaryData,
  doctorLink,
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

  const handleSubmit = async (data: summarySubmitProps) => {
    getSummaryData(data)
    await api.post('/form', {
      doctor_url: doctorLink,
      pacient_name: data.pacient_name,
      pacient_birthdate: pacientData?.pacient_name,
      pacient_gender: pacientData?.pacient_gender,
      pacient_email: pacientData?.pacient_email,
      pacient_number: data.pacient_contact,
      pacient_healthInsurance: pacientData?.pacient_healthInsurance,
      pacient_healthInsuranceName: pacientData?.pacient_healthInsuranceName,
      pacient_healthInsuranceId: pacientData?.pacient_healthInsuranceId,
      companion_name: companionData?.companion_name,
      companion_kinship: companionData?.companion_kinship,
      companion_email: companionData?.companion_email,
      companion_number: companionData?.companion_number,
      cirurgy_name: cirurgyData?.cirurgy_name,
      cirurgy_physician: cirurgyData?.cirurgy_physician,
      pacient_weight: cirurgyData?.pacient_weight,
      pacient_height: cirurgyData?.pacient_height,
      pacient_allergy: cirurgyData?.pacient_allergy,
      pacient_allergy_names: cirurgyData?.pacient_allergy_names,
      pacient_heart_conditions: cirurgyData?.pacient_heart_conditions,
      pacient_heart_conditions_observation:
        cirurgyData?.pacient_heart_conditions_observation,
      pacient_disease: cirurgyData?.pacient_disease,
      pacient_disease_names: cirurgyData?.pacient_disease_names,
      pacient_medicines: cirurgyData?.pacient_medicines,
      pacient_antibiotic: cirurgyData?.pacient_antibiotic,
      pacient_antibiotics_names: cirurgyData?.pacient_antibiotics_names,
      pacient_did_cirurgy: cirurgyData?.pacient_did_cirurgy,
      pacient_cirurgies: cirurgyData?.pacient_cirurgies,
      pacient_smoke: cirurgyData?.pacient_smoke,
      pacient_started_smoking: cirurgyData?.pacient_started_smoking,
      pacient_stopped_smoking: cirurgyData?.pacient_stopped_smoking,
      pacient_when_stop_smoking: cirurgyData?.pacient_when_stop_smoking,
      pacient_pack_smoke: cirurgyData?.pacient_pack_smoke,
      pacient_do_physical_activity: cirurgyData?.pacient_do_physical_activity,
      pacient_physical_activity: cirurgyData?.pacient_physical_activity,
      pacient_has_anesthetic_complication:
        cirurgyData?.pacient_has_anesthetic_complication,
      pacient_anesthetic_complications:
        cirurgyData?.pacient_anesthetic_complications,
      pacient_procedure_summary: cirurgyData?.pacient_procedure_summary,
    })
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
          onSubmit={form.handleSubmit(handleSubmit)}
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
