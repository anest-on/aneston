'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Calendar, Clock, Phone } from '@phosphor-icons/react'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gray-900 border-gray-600"
            >
              <DropdownMenuItem className="p-0"></DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <PatientInfosPdfButton patient={patient}>
                  Informações do paciente
                </PatientInfosPdfButton>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0">
                <ConsultationCertificatePdfButton patient={patient}>
                  Gerar Cerfinado
                </ConsultationCertificatePdfButton>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0">
                <PatientSendEmailCertificateButton formId={patient.id}>
                  Enviar certificado p/ paciente
                </PatientSendEmailCertificateButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
