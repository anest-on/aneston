/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Calendar, Clock, Phone } from '@phosphor-icons/react'
import { ArrowUpDown, FileSymlink, MoreHorizontal } from 'lucide-react'

import { useMediaQuery } from 'usehooks-ts'

import { EditPatientButton } from '@/components/EditPatientButton'
import ConsultationCertificatePdfButton from '@/components/consultationCertificatePdfButton'
import { cirurgySubmitProps } from '@/components/page/cirurgyPage'
import { companionSubmitProps } from '@/components/page/companionPage'
import { pacientSubmitProps } from '@/components/page/pacientPage'
import PatientInfosPdfButton from '@/components/patientInfosPdfButton'
import PatientSignNowButton from '@/components/patientSignNowButton'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { UpdateCertificateInfoDialog } from '@/components/updateCertificateInfoDilog'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppointmentStatusEnum } from '@prisma/client'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RWebShare } from 'react-web-share'
import { z } from 'zod'
import { RangeDateFn, StatusFilterFn } from './filters'

export interface Patient
  extends pacientSubmitProps,
    cirurgySubmitProps,
    companionSubmitProps {
  id: string
  appointment_status: AppointmentStatusEnum
  doctor_id: string
  doctor_url: string
  schedule_date: string
  observations: string
  archived?: boolean
  created_at: string
  updated_at: string
}

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'appointment_status',
    accessorFn: (x) => x,
    filterFn: StatusFilterFn,
    meta: {
      filterComponent: StatusFilterFn,
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Consulta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const patient = row.original

      if (patient.appointment_status === AppointmentStatusEnum.CONCLUDED)
        return (
          <div className="flex items-center justify-center  justify-self-start">
            <div className="flex text-center px-2 font-normal bg-green-500 text-gray-800 rounded-sm justify-center items-center py-1">
              <b>Assinado</b>
            </div>
          </div>
        )
      else if (patient.appointment_status === AppointmentStatusEnum.UNDONE)
        return (
          <div className="flex items-center justify-center justify-self-start ">
            <div className="flex text-center font-normal px-2 bg-yellow-500 text-gray-800 rounded-sm justify-center items-center py-1">
              <b>Pendente</b>
            </div>
          </div>
        )
      else if (patient.appointment_status === AppointmentStatusEnum.CANCELED)
        return (
          <div className="flex items-center justify-center  justify-self-start">
            <div className="flex text-center font-normal px-2 bg-red-500 text-gray-800 rounded-sm justify-center items-center py-1">
              <b>Cancelado</b>
            </div>
          </div>
        )
    },
  },
  {
    accessorKey: 'pacient_email',
    // header: 'Email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const patient = row.original

      return (
        <div className="flex flex-col text-left font-medium gap-1 justify-self-start">
          <div className="font-bold text-gray-100">{patient.pacient_name}</div>
          <div className="font-medium">
            {patient.cirurgy_name} - {patient.cirurgy_physician}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'pacient_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: undefined,
  },

  {
    accessorKey: 'schedule_date',
    accessorFn: (x) => x,
    filterFn: RangeDateFn,
    meta: {
      filterComponent: RangeDateFn,
    },
    sortingFn: (rowA, rowB, columnId) => {
      const rowADate = new Date(rowA.original.schedule_date)
      const rowBDate = new Date(rowB.original.schedule_date)
      return rowADate.getTime() - rowBDate.getTime()
    },
    header: ({ column }) => {
      const isMobile = useMediaQuery('(max-width: 640px)')

      // Retorna undefined para dispositivos móveis
      if (isMobile) {
        return undefined
      }
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data da consulta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      // Detecta se o tamanho da tela é menor que 640px (padrão para celular)
      const isMobile = useMediaQuery('(max-width: 640px)')

      // Retorna undefined para dispositivos móveis
      if (isMobile) {
        return undefined
      }

      const patient = row.original

      return patient.schedule_date ? (
        <div className="grid lg:grid-cols-5 sm:grid-rows-3 grid-flow-row gap-1 justify-self-end font-medium">
          <div className="flex gap-1 md:col-span-3">
            <span>
              <Calendar size={18} />
            </span>
            {dayjs(patient.schedule_date).locale(ptBr).format('DD[/]MM[/]YYYY')}
          </div>

          <div className="flex gap-1 md:col-span-2 md:justify-end">
            <Clock size={18} />
            {dayjs(patient.schedule_date).locale(ptBr).format('HH[:]mm')}
          </div>

          <div className="flex md:col-span-5">
            <Phone size={18} />
            {patient.pacient_number}
          </div>
        </div>
      ) : (
        <div className="flex md:col-span-5">
          <Phone size={18} />
          {patient.pacient_number}
        </div>
      )
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original

      const [openCreateCertificate, setOpenCreateCertificate] = useState(false)
      const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
        patient,
      )

      const updateCertificateSchema = z.object({
        name: z
          .string()
          .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
        cpf: z.string().min(11, { message: 'Digite um CPF válido.' }),
        date: z.date({
          required_error: 'A data de realização da consulta é obrigatória.',
        }),
      })

      const updateCertificate = async (
        values: z.infer<typeof updateCertificateSchema>,
      ) => {
        // Preencher as informações do paciente selecionado
        const payload = {
          id: selectedPatient?.id,
          pacient_name: values.name || selectedPatient?.pacient_name,
          pacient_cpf: values.cpf || selectedPatient?.pacient_cpf,
          schedule_date: values.date || selectedPatient?.schedule_date,
          doctor_id: selectedPatient?.doctor_id,
          appointment_status: selectedPatient?.appointment_status,
        }

        try {
          const response = await api.put('/form', payload)
          toast({
            title: 'Certificado atualizado com sucesso!',
            description: 'Agora o paciente já pode assinar o documento.',
          })
          setOpenCreateCertificate(false)
          // window.open(`/consultation-certificate/${response.data.id}`, '_blank')
          setTimeout(() => {
            window.location.reload()
          }, 500)
        } catch (error) {
          console.error('Erro ao enviar o formulário:', error)
          toast({
            title: 'Erro ao gerar certificado',
            variant: 'destructive',
            description: 'Ocorreu um erro criar o certificado de consulta.',
          })
        }
      }

      const form = useForm<z.infer<typeof updateCertificateSchema>>({
        resolver: zodResolver(updateCertificateSchema),
        defaultValues: {
          name: patient.cirurgy_name || '',
          cpf: patient.pacient_cpf || '',
          date: new Date(patient.schedule_date) || new Date(),
        },
      })

      const { isSubmitting } = form.formState

      return (
        <div className="flex flex-row items-center justify-end gap-4 justify-self-end">
          <EditPatientButton patient={patient}>Atualizar</EditPatientButton>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full align-end bg-gray-900 border-gray-600">
              <div className="p-0 hover:bg-gray-600 cursor-pointer rounded-md">
                <PatientInfosPdfButton patient={patient}>
                  Visualizar respostas do paciente
                </PatientInfosPdfButton>
              </div>

              <div className="p-0 hover:bg-gray-600 cursor-pointer rounded-md">
                {!patient.pacient_name ||
                !patient.pacient_cpf ||
                !patient.schedule_date ? (
                  <UpdateCertificateInfoDialog
                    open={openCreateCertificate}
                    setOpen={setOpenCreateCertificate}
                    updateCertificate={updateCertificate}
                    isSubmitting={isSubmitting}
                    initialData={selectedPatient}
                    buttonType="compartilhar"
                  />
                ) : (
                  <RWebShare
                    data={{
                      text: 'Utilize o link abaixo para preencher seu formulário para consulta.',
                      url: `https://aneston.vercel.app/consultation-certificate/${patient.id}`,
                      title: 'Aneston - Formulário de Consulta',
                    }}
                  >
                    <Button
                      variant={'ghost'}
                      className="hover:text-gray-40 w-full h-full gap-1 flex fles-row justify-start p-2"
                      onClick={(e) => e.preventDefault()}
                    >
                      <FileSymlink className="w-4 h-4 hover:cursor-pointer" />
                      Compartilhar link de assinatura do comprovante
                    </Button>
                  </RWebShare>
                )}
                {/* <PatientSendEmailCertificateButton
                  formId={patient.id}
                  patientEmail={patient.pacient_email}
                >
                  Enviar o certificado de consulta ao paciente
                </PatientSendEmailCertificateButton> */}
              </div>
              <div className="p-0 hover:bg-gray-600 cursor-pointer rounded-md">
                {!patient.pacient_name ||
                !patient.pacient_cpf ||
                !patient.schedule_date ? (
                  <UpdateCertificateInfoDialog
                    open={openCreateCertificate}
                    setOpen={setOpenCreateCertificate}
                    updateCertificate={updateCertificate}
                    isSubmitting={isSubmitting}
                    initialData={selectedPatient}
                    buttonType="assinar"
                  />
                ) : (
                  <PatientSignNowButton formId={patient.id}>
                    Assinar comprovante
                  </PatientSignNowButton>
                )}
              </div>

              <div className="p-0 hover:bg-gray-600 cursor-pointer rounded-md">
                <ConsultationCertificatePdfButton patient={patient}>
                  Visualizar comprovante
                </ConsultationCertificatePdfButton>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    },
  },
]
