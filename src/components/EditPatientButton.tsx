/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Patient as PatientProps } from '@/app/dashboard/columns'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppointmentStatusEnum } from '@prisma/client'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useToast } from './ui/use-toast'

const updatePatientSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
  surgery: z.string().optional(),
  appointmentStatus: z.enum(['CONCLUDED', 'UNDONE', 'CANCELED']).optional(),
  cellNumber: z.string().optional(),
  createdAt: z.string(),
  doctorId: z.string(),
})

export type UpdatePatientData = z.infer<typeof updatePatientSchema>

interface ThirdPartyUserProps {
  patient: PatientProps
  children?: React.ReactNode
}

export function EditPatientButton({ patient, children }: ThirdPartyUserProps) {
  const { toast } = useToast()

  const [openUpdatePatient, setOpenUpdatePatient] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateForm = useForm<z.infer<typeof updatePatientSchema>>({
    resolver: zodResolver(updatePatientSchema),
    defaultValues: {
      name: patient.pacient_name,
      surgery: patient.cirurgy_name || '',
      cellNumber: patient.pacient_number || '',
      appointmentStatus: patient.appointment_status || 'UNDONE',
      createdAt: String(patient.created_at),
      doctorId: patient.doctor_id!,
    },
  })

  const { isSubmitting } = updateForm.formState

  const onSubmit = async (values: z.infer<typeof updatePatientSchema>) => {
    try {
      setLoading(true)
      const newPatient = patient
      newPatient.pacient_name = values.name
      newPatient.cirurgy_name = values.surgery
      if (values.cellNumber) {
        newPatient.pacient_number = values.cellNumber
      }
      if (values.appointmentStatus) {
        newPatient.appointment_status =
          AppointmentStatusEnum[values.appointmentStatus]
      }

      await api.put('/form', newPatient)

      toast({
        title: 'Dados do paciente modificados com sucesso!',
        variant: 'success',
      })

      setLoading(false)
      setOpenUpdatePatient(false)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        return
      }
      console.error(err)
    }
  }

  const arquivePatient = async () => {
    try {
      setLoading(true)
      const newPatient = patient
      newPatient.archived = !patient.archived

      await api.put('/form', newPatient)

      if (newPatient.archived) {
        toast({
          title: 'Paciente arquivado com sucesso!',
          variant: 'default',
        })
      } else {
        toast({
          title: 'Paciente desarquivado com sucesso!',
          variant: 'default',
        })
      }

      console.log(newPatient)

      setLoading(false)
      setOpenUpdatePatient(false)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        return
      }
      console.error(err)
    }
  }

  return (
    <div className="flex gap-4 justify-end">
      <Dialog open={openUpdatePatient} onOpenChange={setOpenUpdatePatient}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="hover:text-gray-40 w-full h-full gap-1 flex fles-row justify-start p-2"
          >
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 border-gray-600">
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              Informações do Paciente
            </DialogTitle>
          </DialogHeader>
          <Form {...updateForm}>
            <form
              onSubmit={updateForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col w-full mr-4">
                <FormField
                  control={updateForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome:</FormLabel>
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
                  control={updateForm.control}
                  name="surgery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cirurgia:</FormLabel>
                      <FormControl>
                        <Input disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row justify-between px-5">
                <FormField
                  control={updateForm.control}
                  name="appointmentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status da consulta:</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isSubmitting}
                          {...field}
                          defaultValue={patient.appointment_status}
                          onValueChange={(e: AppointmentStatusEnum) =>
                            field.onChange(e)
                          }
                        >
                          <SelectTrigger className="w-[180px] mt-10">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={AppointmentStatusEnum.CONCLUDED}>
                              <span className="flex flex-row gap-2 items-center ">
                                <div className="h-4 w-4 bg-green-500 rounded-lg" />
                                Concluído
                              </span>
                            </SelectItem>

                            <SelectItem value={AppointmentStatusEnum.UNDONE}>
                              <span className="flex flex-row gap-2 items-center">
                                <div className="h-4 w-4 bg-yellow-500 rounded-lg" />
                                Pendente
                              </span>
                            </SelectItem>

                            <SelectItem value={AppointmentStatusEnum.CANCELED}>
                              <span className="flex flex-row gap-2 items-center">
                                <div className="h-4 w-4 bg-red-500 rounded-lg" />
                                Cancelado
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="cellNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contato:</FormLabel>
                      <FormControl>
                        <Input disabled={isSubmitting} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="px-5">
                <Button
                  className="w-full border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                  disabled={loading}
                  variant={'outline'}
                  onClick={arquivePatient}
                  type="button"
                >
                  {patient.archived
                    ? 'Desarquivar Paciente'
                    : 'Arquivar Paciente'}
                </Button>
              </div>

              <div className="flex w-full px-5 justify-between">
                <DialogClose>
                  <Button
                    className="w-[150px] border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    variant={'outline'}
                    type="button"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-[150px]" disabled={loading}>
                  Confirmar Alterações
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
