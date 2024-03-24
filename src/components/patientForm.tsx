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
import { formPatientInterface } from '@/app/appointments-management/page'

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
  createdAt: z.string(),
  doctorId: z.string(),
})

export type UpdatePatientData = z.infer<typeof updatePatientSchema>

export type DeletePatientData = {
  name: string
  cellNumber: string
  doctorId: string
}

interface ThirdPartyUserProps {
  patient: formPatientInterface
  handleSubmit: (data: formPatientInterface) => void
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
      name: patient.pacient_name,
      surgery: patient.cirurgy_name,
      cellNumber: patient.pacient_number,
      createdAt: '',
      doctorId: patient.doctor_id!,
    },
  })

  const { isSubmitting } = updateForm.formState

  const onSubmit = (values: z.infer<typeof updatePatientSchema>) => {
    const newPatient = patient
    newPatient.pacient_name = values.name
    newPatient.cirurgy_name = values.surgery
    newPatient.pacient_number = values.cellNumber
    handleSubmit && handleSubmit(newPatient)
  }

  const onDelete = () => {
    handleDelete &&
      handleDelete({
        name: patient.pacient_name,
        cellNumber: patient.pacient_number,
        doctorId: patient.doctor_id!,
      })
  }

  return (
    <TableRow className="border-b border-gray-600">
      <TableCell className="hidden items-center md:flex">
        {patient.pacient_number}
      </TableCell>
      <TableCell>{patient.pacient_name}</TableCell>
      <TableCell>{}</TableCell>

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
                    <Button type="submit" className="w-[150px]">
                      Confirmar Alterações
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Trash className="w-4 h-4 hover:text-red-500 hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-600">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Tem certeza que deseja deletar este paciente?
                </DialogTitle>
                <p className="text-center text-white pt-2">
                  Paciente: {patient.pacient_name}
                </p>
                <div className="flex justify-between pt-5 px-16">
                  <DialogClose>
                    <Button
                      className="w-[150px] border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                      variant={'outline'}
                      type="button"
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose>
                    <Button
                      className="w-[150px] border-red-500 text-white bg-red-500 hover:bg-red-500/90"
                      onClick={() => {
                        onDelete()
                      }}
                    >
                      Deletar
                    </Button>
                  </DialogClose>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  )
}
