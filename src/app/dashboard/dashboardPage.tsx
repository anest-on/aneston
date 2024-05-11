/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { DeletePatientData } from '@/components/patientForm'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Copy } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Patient, columns } from './columns'
import { DataTable } from './data-table'

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



// async function getData(): Promise<Patient[] | unknown> {
//   // Fetch data from your API here.
  
//   return patients.data
// }


const DashboardPage = ( ) => {
  const [patients, setPatients] = useState<Patient[]>([])

  const session = useSession()
  const { toast } = useToast()

  // useMemo(async () => {
  //   const data  = await api.get('/form')
  //   setPatient(() => data)
  // }, [])

  // const data = getData()

  // console.log(patient)


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

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(
      // TODO: Mudar link quando for para produção
      `https://aneston.vercel.app/form/${session.data?.user.user_link}`,
    )
  }

  const { isSubmitting } = form.formState


  const patientsList = useCallback(async () => {
    const response = await api.get('/form')

    console.log(response.data)

    setPatients(response.data)
  }, [])

  useEffect(() => {
    patientsList()
  }, [patientsList])

  const [openCreateUser, setOpenCreateUser] = useState(false)
  const [openUpdateUser, setOpenUpdateUser] = useState(false)

  const handleUpdatePatient = async (data: Patient) => {
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
    <main className="max-w-[880px] h-full mt-10 mx-auto mb-10 py-0 px-4">
      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600">
        <p className="text-white text-center text-2xl font-bold">
          Gestão de Consultas
        </p>
        <div className="w-full h-[2px] mt-6 px-6 bg-gray-500" />
        <div className="flex flex-col rounded-md bg-gray-800 mt-6">
          <DataTable columns={columns} data={patients || []} />
        </div>
        <div className="w-full flex justify-center mt-6 gap-20">
          <Button
            variant={'outline'}
            className="text-white border-white hover:bg-gray-600"
            onClick={() => {
              copyLinkToClipboard()
              toast({
                title: 'Link copiado para a área de transferência!',
                description: `Seu Link: https://aneston.vercel.app/form/${session.data?.user.user_link}`,
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

export default DashboardPage
