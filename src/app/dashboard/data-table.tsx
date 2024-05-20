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
import { useState } from 'react'
import { DataTablePagination } from './data-table-pagination'
import { RangeDateFn } from './filters'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filterDisplay, setFilterdisplay] = useState(false)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [finalDate, setFinalDate] = useState<Date | null>(null)

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'schedule_date',
      desc: false,
    },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

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
              label="Data de início:"
              defaultValue={dayjs(startDate)
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
              label="Data de início:"
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
            {/* <Button
              variant="circle"
              className="w-[80px]"
              onClick={() => {
                table.getColumn('schedule_date')
              }}
            >
              Filtrar
            </Button> */}
          </div>
        </div>
      )}

      <div className="flex rounded-lg flex-col gap-5">
        <Table className="rounded-lg bg-gray-900">
          <TableHeader className="rounded-lg border-none">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded-md border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
        <Table className="w-full">
          <TableBody className="flex flex-col gap-2 items-center w-full ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className=" flex bg-gray-600 rounded-md w-full items-center justify-between"
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
