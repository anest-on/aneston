'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Calendar, Clock, Phone } from '@phosphor-icons/react'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { cirurgySubmitProps } from '@/components/page/cirurgyPage'
import { companionSubmitProps } from '@/components/page/companionPage'
import { pacientSubmitProps } from '@/components/page/pacientPage'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { RangeDateFn } from './filters'

// Nome, email, contato, data consulta
// export interface Patient
//   extends cirurgySubmitProps,
//     companionSubmitProps,
//     pacientSubmitProps {
//   id: string
//   doctor_url: string
//   schedule_date: string
// }

enum AppointmentStatusEnum {
  DONE = 'DONE',
  UNDONE = 'UNDONE',
  CANCELED = 'CANCELED',
}

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

      if (patient.appointment_status === AppointmentStatusEnum.DONE)
        return (
          <div className="flex items-center justify-center w-[140px]">
            <div className="flex text-left px-2 font-medium bg-green-500 text-white rounded-sm justify-center items-center py-1">
              <b>Concluída</b>
            </div>
          </div>
        )
      else if (patient.appointment_status === AppointmentStatusEnum.UNDONE)
        return (
          <div className="flex items-center justify-center w-[140px]">
            <div className="flex text-left font-medium px-2 bg-yellow-500 text-gray-900 rounded-sm justify-center items-center py-1">
              <b>Não realizada</b>
            </div>
          </div>
        )
      else if (patient.appointment_status === AppointmentStatusEnum.CANCELED)
        return (
          <div className="flex items-center justify-center w-[140px]">
            <div className="flex text-left font-medium px-2 bg-red-500 text-white rounded-sm justify-center items-center py-1">
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
        <div className="flex flex-col text-left font-medium gap-1">
          <div className="font-bold text-gray-100">{patient.pacient_name}</div>
          <div className="font-medium">
            {patient.cirurgy_name} - {patient.cirurgy_physician}
          </div>
        </div>
      )
    },
  },

  {
    accessorKey: 'schedule_date',
    accessorFn: (x) => x,
    filterFn: RangeDateFn,
    enableHiding: true,
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
        <div className="flex flex-col text-left font-medium gap-1">
          <div className="flex flex-row items-center  font-medium gap-3">
            <div className="flex gap-1">
              <Calendar size={18} />
              {dayjs(patient.schedule_date)
                .locale(ptBr)
                .format('DD[/]MM[/]YYYY')}
            </div>
            <div className="flex gap-1">
              <Clock size={18} />
              {dayjs(patient.schedule_date).locale(ptBr).format('HH[:]mm')}
            </div>
          </div>

          <div className="flex flex-row items-center  font-medium">
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
            <DropdownMenuLabel>Ações com paciente</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(patient.id)}
            >
              Ver informações
            </DropdownMenuItem>
            <DropdownMenuItem>Gerar comprovante</DropdownMenuItem>
            <DropdownMenuItem>Editar dados</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-600" />
            <DropdownMenuItem>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
]
