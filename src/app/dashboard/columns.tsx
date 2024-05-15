'use client'

import { ColumnDef } from '@tanstack/react-table'

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

// Nome, email, contato, data consulta
// export interface Patient
//   extends cirurgySubmitProps,
//     companionSubmitProps,
//     pacientSubmitProps {
//   id: string
//   doctor_url: string
//   schedule_date: string
// }

export interface Patient
  extends pacientSubmitProps,
    cirurgySubmitProps,
    companionSubmitProps {
  id: string
  doctor_id: string
  doctor_url: string
  schedule_date: string
  created_at: string
  updated_at: string
}

export const columns: ColumnDef<Patient>[] = [
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
  },
  {
    accessorKey: 'schedule_date',
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
        <div className="text-left font-medium">
          {dayjs(patient.schedule_date)
            .locale(ptBr)
            .format('DD[/]MM[/]YYYY [ às ] HH[h]mm')}
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
]
