/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { Copy, FilePlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { Patient, columns } from './columns'
import { DataTable } from './data-table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { CalendarShadcn } from '@/components/ui/calendar-shadcn'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'

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

const createCertificateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
  cpf: z.string().optional(),
  date: z.date({
    required_error: 'A data de realização da consulta é obrigatória.',
  }),
})

const DashboardPage = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const session = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [doctor, setDoctor] = useState({} as User)

  useEffect(() => {
    async function searchingDoctor() {
      const doctor = await api.get('doctor')
      setDoctor(doctor.data)
    }
    searchingDoctor()
  }, [session.data?.user.accessType, session.data?.user.doctor_id])

  const form = useForm<z.infer<typeof createCertificateSchema>>({
    resolver: zodResolver(createCertificateSchema),
    defaultValues: {
      name: '',
      cpf: '',
      date: new Date(),
    },
  })

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(
      `https://aneston.vercel.app/form/${doctor.user_link}`
    )

    if (!doctor.user_link) {
      toast({
        title: 'Você não possui um link cadastrado!',
        variant: 'destructive',
        description: `Entre em 'Meu Perfil' e atualize o seu link de agendamentos.`,
      })
    }

    if (doctor.user_link) {
      toast({
        title: 'Link copiado para a área de transferência!',
        description: `Seu Link: https://aneston.vercel.app/form/${doctor.user_link}`,
      })
    }
  }

  const createCertificate = async (values: z.infer<typeof createCertificateSchema>) => {
    const payload = {
      doctor_url: session.data?.user.user_link,
      pacient_name: values.name,
      pacient_cpf: values.cpf,
      schedule_date: values.date,
    };
  
    try {
      const response = await api.post('/form', payload);
      toast({
        title: 'Certificado gerado com sucesso!',
        description: 'Os dados do paciente foram enviados.',
      });
      router.push(`/consultation-certificate/${response.data.id}`);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      toast({
        title: 'Erro ao gerar certificado',
        variant: 'destructive',
        description: 'Ocorreu um erro ao enviar os dados do paciente.',
      });
    }
  };

  const { isSubmitting } = form.formState

  const patientsList = useCallback(async () => {
    const response = await api.get('/form')
    setPatients(response.data)
  }, [])

  useEffect(() => {
    patientsList()
  }, [patientsList])

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
            onClick={copyLinkToClipboard}
          >
            Link para Agendamentos
            <Copy className="w-4 h-4 ml-2" />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Gerar Certificado
                <FilePlus className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 border border-solid border-gray-600">
              <DialogHeader>
                <DialogTitle>Gerar Certificado de Consulta</DialogTitle>
                <DialogDescription>
                  Preencha com as informações do paciente para que seja gerado seu certificado de realização de consulta.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(createCertificate)} className="flex flex-col gap-4">
                  <FormField
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do paciente</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF do paciente</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Controller
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de realização da consulta</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center">
                            <CalendarShadcn
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => field.onChange(date)}
                              className="rounded-md border bg-gray-900"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Gerando...' : 'Gerar Certificado'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
