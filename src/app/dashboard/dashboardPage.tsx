/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { CreateCertificateDialog } from '@/components/createCertificateDialog'; // Importando o componente criado
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { Copy } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RWebShare } from "react-web-share";
import { z } from 'zod';
import { columns, Patient } from './columns';
import { DataTable } from './data-table';

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
  cpf: z.string().min(11, { message: 'Digite um CPF válido.' }),
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
  const [openCreateCertificate, setOpenCreateCertificate] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const openCreateCertificateModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenCreateCertificate(true);
  };

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
    // Preencher as informações do paciente selecionado
    const payload = {
      doctor_url: session.data?.user.user_link,
      pacient_name: values.name || selectedPatient?.pacient_name,
      pacient_cpf: values.cpf || selectedPatient?.pacient_cpf,
      schedule_date: values.date || selectedPatient?.schedule_date,
      appointment_status: 'CONCLUDED',
    };

    try {
      const response = await api.post('/form', payload);
      toast({
        title: 'Certificado gerado com sucesso!',
        description: 'Agora o paciente já pode assinar o documento.',
      });
      setOpenCreateCertificate(false);
      window.open(`/consultation-certificate/${response.data.id}`, '_blank');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      toast({
        title: 'Erro ao gerar certificado',
        variant: 'destructive',
        description: 'Ocorreu um erro criar o certificado de consulta.',
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
        <div className="flex flex-wrap rounded-md bg-gray-800 mt-6">
          <DataTable columns={columns} data={patients || []} />
        </div>
        <div className="w-full flex flex-wrap justify-center mt-6 sm:gap-20 gap-y-3">
          <div>
            <RWebShare
              data={{
                text: "Utilize o link abaixo para preencher seu formulário para consulta.",
                url: `https://aneston.vercel.app/form/${doctor.user_link}`,
                title: "Aneston - Formulário de Consulta",
              }}
            >
              <Button
                variant={'outline'}
                className="text-white border-white hover:bg-gray-600"
              >
                Link para Agendamentos
                <Copy className="w-4 h-4 ml-2" />
              </Button>
            </RWebShare>
          </div>

          <CreateCertificateDialog 
            open={openCreateCertificate}
            setOpen={setOpenCreateCertificate}
            createCertificate={createCertificate}
            isSubmitting={isSubmitting}
            initialData={selectedPatient}
          />
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
