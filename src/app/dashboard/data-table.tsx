/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Funnel } from '@phosphor-icons/react'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { useEffect, useState } from 'react'
import { DataTablePagination } from './data-table-pagination'
import { RangeDateFn, StatusFilterFn } from './filters'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
}

interface appointmentFilterProps {
  done: boolean
  undone: boolean
  canceled: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filterDisplay, setFilterdisplay] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [finalDate, setFinalDate] = useState<Date | null>(null)
  const [appointmentFilter, setAppointmentFilter] =
    useState<appointmentFilterProps>({
      done: true,
      undone: true,
      canceled: false,
    })
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'schedule_date',
      desc: false,
    },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  useEffect(() => {
    table.getColumn('appointment_status')?.setFilterValue(appointmentFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentFilter])

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      RangeDate: RangeDateFn,
      StatusFilter: StatusFilterFn,
    },
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="">
      <div className="flex items-center justify-center py-4 gap-3">
        <Input
          placeholder="Buscar paciente"
          value={
            (table.getColumn('pacient_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('pacient_name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div>
          <Button
            variant="circle"
            onClick={() => setFilterdisplay((data) => !data)}
          >
            <Funnel size={20} />
          </Button>
        </div>
      </div>

      {filterDisplay && (
        <div className="flex flex-col px-2 mb-5 py-5 gap-4 items-center bg-gray-600 rounded-md">
          <div className="flex flex-row justify-center items-end gap-4">
            <Input
              type="date"
              label="Data inicial:"
              defaultValue={dayjs(new Date())
                .locale(ptBr)
                .format('YYYY[-]MM[-]DD')}
              onChange={(value) => {
                table
                  .getColumn('schedule_date')
                  ?.setFilterValue((old: [Date, Date]) => [
                    dayjs(value.target.value).toDate(),
                    old?.[1],
                  ])
              }}
            />
            <Input
              type="date"
              label="Data final:"
              defaultValue={dayjs(finalDate)
                .locale(ptBr)
                .format('YYYY[-]MM[-]DD')}
              onChange={(value) => {
                table
                  .getColumn('schedule_date')
                  ?.setFilterValue((old: [Date, Date]) => [
                    old?.[0],
                    dayjs(value.target.value).add(1, 'day').toDate(),
                  ])
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-center gap-4 mb-2">
        <Button
          variant={`badge${appointmentFilter.undone ? 'Active' : ''}`}
          className="gap-2 "
          onClick={() =>
            setAppointmentFilter((data) => {
              return {
                done: data.done,
                canceled: data.canceled,
                undone: !data.undone,
              }
            })
          }
        >
          <div className="h-4 w-4 bg-yellow-500 rounded-lg" />
          Pendente
        </Button>
        <Button
          variant={`badge${appointmentFilter.canceled ? 'Active' : ''}`}
          className="gap-2 "
          onClick={() =>
            setAppointmentFilter((data) => {
              return {
                done: data.done,
                canceled: !data.canceled,
                undone: data.undone,
              }
            })
          }
        >
          <div className="h-4 w-4 bg-red-500 rounded-lg" />
          Cancelado
        </Button>
        <Button
          variant={`badge${appointmentFilter.done ? 'Active' : ''}`}
          className="gap-2 "
          onClick={() =>
            setAppointmentFilter((data) => {
              return {
                done: !data.done,
                canceled: data.canceled,
                undone: data.undone,
              }
            })
          }
        >
          <div className="h-4 w-4 bg-green-500 rounded-lg" />
          Assinado
        </Button>
      </div>

      <div className="flex rounded-lg flex-col gap-5">
        <Table className="rounded-lg bg-gray-900">
          <TableHeader className="rounded-lg border-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="flex flex-row rounded-md border-none items-center justify-center"
              >
                {headerGroup.headers.map((header) => {
                  const isDisplayed =
                    header.id.includes('actions') ||
                    header.id.includes('pacient_email')

                  if (!isDisplayed)
                    return (
                      <TableHead
                        key={header.id}
                        className="flex flex-col items-center justify-center"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  else return null
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
        <Table className="w-full">
          <TableBody className="flex flex-col gap-2 items-center ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className=" grid grid-cols-4 bg-gray-600 rounded-md w-full items-center"
                >
                  {row.getVisibleCells().map((cell) => {
                    const isDisplayed = cell.id.includes('pacient_name')

                    if (!isDisplayed)
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    else return null
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  Nenhum paciente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
