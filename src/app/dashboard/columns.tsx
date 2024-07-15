'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Calendar, Clock, Phone } from '@phosphor-icons/react'
import { ArrowUpDown, FileSymlink, MoreHorizontal } from 'lucide-react'

import { EditPatientButton } from '@/components/EditPatientButton'
import ConsultationCertificatePdfButton from '@/components/consultationCertificatePdfButton'
import { cirurgySubmitProps } from '@/components/page/cirurgyPage'
import { companionSubmitProps } from '@/components/page/companionPage'
import { pacientSubmitProps } from '@/components/page/pacientPage'
import PatientInfosPdfButton from '@/components/patientInfosPdfButton'
import PatientSendEmailCertificateButton from '@/components/patientSendEmailCertificateButton'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AppointmentStatusEnum } from '@prisma/client'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { RangeDateFn, StatusFilterFn } from './filters'
import PatientSignNowButton from '@/components/patientSignNowButton'
import { RWebShare } from 'react-web-share'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export interface Patient
  extends pacientSubmitProps,
    cirurgySubmitProps,
    companionSubmitProps {
  id: string
  appointment_status: AppointmentStatusEnum
  doctor_id: string
  doctor_url: string
  schedule_date: string
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
              <b>Concluída</b>
            </div>
          </div>
        )
      else if (patient.appointment_status === AppointmentStatusEnum.UNDONE)
        return (
          <div className="flex items-center justify-center justify-self-start ">
            <div className="flex text-center font-normal px-2 bg-yellow-500 text-gray-800 rounded-sm justify-center items-center py-1">
              <b>Não realizada</b>
            </div>
          </div>
        )
      else if (patient.appointment_status === AppointmentStatusEnum.CANCELED)
        return (
          <div className="flex items-center justify-center  justify-self-start">
            <div className="flex text-center font-normal px-2 bg-red-500 text-gray-800 rounded-sm justify-center items-center py-1">
              <b>Cancelada</b>
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
      const patient = row.original

      return (
        <div className="grid lg:grid-cols-5 sm:grid-rows-3 grid-flow-row gap-1 justify-self-end font-medium ">
          <div className="flex gap-1 md:col-span-3 ">
            <span>
              <Calendar size={18} />
            </span>
            {dayjs(patient.schedule_date).locale(ptBr).format('DD[/]MM[/]YYYY')}
          </div>

          <div className="flex gap-1 md:col-span-2  md:justify-end">
            <Clock size={18} />
            {dayjs(patient.schedule_date).locale(ptBr).format('HH[:]mm')}
          </div>

          <div className="flex  md:col-span-5  ">
            <Phone size={18} />
            {patient.pacient_number}
          </div>
        </div>
      )
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original

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
                  Resposta do paciente
                </PatientInfosPdfButton>
              </div>

              <div className="p-0 hover:bg-gray-600 cursor-pointer rounded-md">
                {/* <PatientSendEmailCertificateButton
                  formId={patient.id}
                  patientEmail={patient.pacient_email}
                >
                  Enviar o certificado de consulta ao paciente
                </PatientSendEmailCertificateButton> */}
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
                    Enviar o certificado de consulta ao paciente
                  </Button>
                </RWebShare>
              </div>
              <div className="p-0 hover:bg-gray-600 cursor-pointer rounded-md">
                <PatientSignNowButton formId={patient.id}>
                  Assinar agora
                </PatientSignNowButton>
              </div>

              <div className="p-0 hover:bg-gray-600 cursor-pointer rounded-md">
                <ConsultationCertificatePdfButton patient={patient}>
                  Conferir o certificado
                </ConsultationCertificatePdfButton>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    },
  },
]
