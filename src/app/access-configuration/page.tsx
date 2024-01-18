'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Copy, Pencil, Trash } from 'lucide-react'

const employees = [
  {
    name: 'Matheus Adorno',
    email: 'matheusadorno@gmail.com',
    role: 'Acesso Completo',
  },
  {
    name: 'Matheus Adorno',
    email: 'matheusadorno@gmail.com',
    role: 'Acesso Completo',
  },
  {
    name: 'Matheus Adorno',
    email: 'matheusadorno@gmail.com',
    role: 'Acesso Completo',
  },
]

const AccessConfiguration = () => {
  return (
    <main className="max-w-[880px] h-screen mt-20 mx-auto mb-4 py-0 px-4">
      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6">
        <p className="text-white text-center text-2xl font-bold">
          Configuração de Acessos
        </p>
        <div className="w-full h-[2px] mt-6 px-6 bg-gray-500" />
        <div className="flex flex-col rounded-md bg-gray-800 border border-solid border-gray-600 mt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-600">
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="text-right w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  className="border-b border-gray-600"
                  key={employee.email}
                >
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-4 justify-end">
                      <Pencil className="w-4 h-4 hover:text-green-500 hover:cursor-pointer" />
                      <Trash className="w-4 h-4 hover:text-red-500 hover:cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-full flex justify-center mt-6 gap-20">
          <Button>Criar novo acesso</Button>
          <Button
            variant={'outline'}
            className="text-white border-white hover:bg-gray-600"
          >
            Link para login
            <Copy className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  )
}

export default AccessConfiguration
