/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import {
  DeletePatientData,
  Patient,
  PatientForm,
  UpdatePatientData,
} from '@/components/patientForm'
import { pacientSubmitProps } from '../../components/page/pacientPage'
import { companionSubmitProps } from '../../components/page/companionPage'
import { cirurgySubmitProps } from '../../components/page/cirurgyPage'

const patientSchema = z.object({
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

export interface formPatientInterface
  extends pacientSubmitProps,
    cirurgySubmitProps,
    companionSubmitProps {
  id: string
  doctor_id: string
}

const AccessConfiguration = () => {
  const session = useSession()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      surgery: '',
      cellNumber: '',
      createdAt: '',
      doctorId: '',
    },
  })

  const { isSubmitting } = form.formState

  const [patients, setPatients] = useState<formPatientInterface[]>([])

  const patientsList = useCallback(async () => {
    const response = await api.get('form')

    console.log(response.data)

    setPatients(response.data)
  }, [])

  useEffect(() => {
    patientsList()
  }, [patientsList])

  const [openCreateUser, setOpenCreateUser] = useState(false)
  const [openUpdateUser, setOpenUpdateUser] = useState(false)

  const handleUpdatePatient = async (data: formPatientInterface) => {
    const doctorId = session.data?.user.id
    if (doctorId) data.doctor_id = doctorId

    try {
      await api.put('/form', data)

      const response = await api.get('form')

      setPatients(response.data)

      toast({
        title: 'Dados do paciente modificados com sucesso!',
        variant: 'success',
      })

      setOpenUpdateUser(false)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        return
      }
      console.error(err)
    }
  }

  const handleDeletePatient = async (data: DeletePatientData) => {
    const doctorId = session.data?.user.id
    if (doctorId) data.doctorId = doctorId

    try {
      await api.delete('/form', { data })

      const response = await api.get('form')

      setPatients(response.data)

      toast({
        title: 'Paciente deletado com sucesso!',
        variant: 'destructive',
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="max-w-[880px] h-screen mt-10 mx-auto mb-4 py-0 px-4">
      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600">
        <p className="text-white text-center text-2xl font-bold">
          Configuração de Acessos
        </p>
        <div className="w-full h-[2px] mt-6 px-6 bg-gray-500" />
        <div className="flex flex-col rounded-md bg-gray-800 border border-solid border-gray-600 mt-6">
          {patients.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-600">
                  <TableHead className="hidden items-center md:flex">
                    Telefone
                  </TableHead>
                  <TableHead className="">Nome</TableHead>
                  <TableHead className="hidden items-center md:flex">
                    Data do Formulário
                  </TableHead>
                  <TableHead className="text-right w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => {
                  return (
                    <PatientForm
                      patient={patient}
                      handleSubmit={handleUpdatePatient}
                      handleDelete={handleDeletePatient}
                      key={patient.id}
                    />
                  )
                })}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="w-full flex justify-center mt-6 gap-20">
          <Button
            variant={'outline'}
            className="text-white border-white hover:bg-gray-600"
            onClick={() => {
              toast({
                title: 'Link copiado para a área de transferência!',
                description: `Seu Link: http://aneston.com/form/${session.data?.user.user_link}`,
              })
            }}
          >
            Link para Agendamentos
            <Copy className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  )
}

export default AccessConfiguration
