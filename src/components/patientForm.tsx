/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { useState } from 'react'
import { Button } from './ui/button'
import { Pencil, Trash } from 'lucide-react'

export type Patient = {
  name: string
  surgery: string
  cellNumber: string
  doctorId: string
  createdAt: string
}

const updatePatientSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
  surgery: z.string().min(3, { message: 'Digite uma cirurgia válida.' }),
  cellNumber: z
    .string()
    .min(6, { message: 'Digite um número de telefone válido.' }),
  createdAt: z.string().datetime(),
  doctorId: z.string(),
})

export type UpdatePatientData = z.infer<typeof updatePatientSchema>

export type DeletePatientData = {
  name: string
  cellNumber: string
  doctorId: string
}

interface ThirdPartyUserProps {
  patient: Patient
  handleSubmit: (data: UpdatePatientData) => void
  handleDelete: (data: DeletePatientData) => void
}

export function PatientForm({
  patient,
  handleSubmit,
  handleDelete,
}: ThirdPartyUserProps) {
  const [openUpdatePatient, setOpenUpdatePatient] = useState(false)

  const updateForm = useForm<z.infer<typeof updatePatientSchema>>({
    resolver: zodResolver(updatePatientSchema),
    defaultValues: {
      name: patient.name,
      surgery: patient.surgery,
      cellNumber: patient.cellNumber,
      createdAt: patient.createdAt,
      doctorId: patient.doctorId!,
    },
  })

  const { isSubmitting } = updateForm.formState

  const onSubmit = (values: z.infer<typeof updatePatientSchema>) => {
    handleSubmit && handleSubmit(values)
    console.log(patient)
  }

  const onDelete = () => {
    handleDelete &&
      handleDelete({
        name: patient.name,
        cellNumber: patient.cellNumber,
        doctorId: patient.doctorId!,
      })
  }

  return (
    <TableRow className="border-b border-gray-600">
      <TableCell className="hidden items-center md:flex">
        {patient.cellNumber}
      </TableCell>
      <TableCell>{patient.name}</TableCell>
      <TableCell>{patient.createdAt}</TableCell>

      <TableCell>
        <div className="flex gap-4 justify-end">
          <Dialog open={openUpdatePatient} onOpenChange={setOpenUpdatePatient}>
            <DialogTrigger asChild>
              <Pencil className="w-4 h-4 hover:text-green-500 hover:cursor-pointer" />
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

                  <div className="flex flex-col">
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

                  <div className="flex w-full px-12 justify-between">
                    <DialogClose>
                      <Button
                        className="w-[150px] border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        variant={'outline'}
                        type="button"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button className="w-[150px]">Confirmar Alterações</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Trash
            onClick={() => {
              onDelete()
            }}
            className="w-4 h-4 hover:text-red-500 hover:cursor-pointer"
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
