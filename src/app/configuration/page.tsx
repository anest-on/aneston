/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { SignatureDoctor } from '@/components/signatureDoctor'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const settingsSchema = z.object({
  message: z.string(),
  easy_scheduling: z.boolean(),
})

type SettingsData = z.infer<typeof settingsSchema>

const AccessConfiguration = () => {
  const { data: session, update } = useSession()
  const { toast } = useToast()

  const [doctor, setDoctor] = useState({} as User)
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      message: doctor.message || '',
      easy_scheduling: doctor?.easy_scheduling,
    },
  })

  const fetchDoctorData = async () => {
    try {
      const response = await api.get('/doctor')
      const doctorData = response.data

      setDoctor(doctorData)
      form.setValue('message', doctorData.message || '')
      form.setValue('easy_scheduling', doctorData.easy_scheduling)
    } catch (error) {
      console.error('Failed to fetch doctor data:', error)
    }
  }

  useEffect(() => {
    fetchDoctorData()
  }, [])

  const { isSubmitting } = form.formState

  const handleUpdateSettings = async (data: SettingsData) => {
    try {
      await api.put('/users', data)

      toast({
        title: 'Informação atualizada com sucesso!',
        variant: 'success',
      })

      // Busque os dados atualizados do banco de dados
      await fetchDoctorData()

      // Atualiza a sessão do usuário para refletir as mudanças
      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            message: data.message,
            easy_scheduling: data.easy_scheduling,
          },
        })
      }
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        return
      }
      toast({
        title: 'Falha para atualizar as informações!',
        variant: 'destructive',
      })
      console.error(err)
    }
  }

  return (
    <main className="w-[700px] h-full mt-10 mx-auto mb-4 py-0 px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateSettings)}
          className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600"
        >
          <p className="text-white text-center text-2xl font-bold">
            Configurações
          </p>
          <div className="w-full h-[2px] mt-6 px-6 bg-gray-500" />

          <div className="flex flex-col mt-6 gap-2">
            <div className="md:flex items-center gap-10 ">
              <p className="text-white font-bold">
                Mensagem de finalização da consulta
              </p>
            </div>
            <p>
              Sempre que finalizar uma consulta o sistema enviará
              automaticamente essa mensagem para o paciente por e-mail. Junto a
              mensagem será enviado o link do cerficado de realização da
              consulta para assinatura do paciente.
            </p>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isSubmitting} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {((session && session.user.accessType === '') ||
            (session && session.user.accessType === null) ||
            (session && session.user.accessType === undefined)) && (
            <div className="flex flex-col mt-12 gap-2 ">
              <div className="md:flex gap-10">
                <p className="text-white font-bold">Assinatura</p>
              </div>
              <p>
                Assinatura que ficará registrada na Comprovante de Realização de
                Consulta Pré-anestésica.
              </p>

              {doctor?.signature_url ? (
                <div className="flex flex-col md:flex-row items-center justify-between px-4 mt-4 gap-4">
                  <div className="w-[300px] h-[150px] self-center md:self-start  bg-white flex border-gray-900 border-1">
                    <Image
                      src={doctor?.signature_url}
                      alt="signature"
                      width={300}
                      height={150}
                    />
                  </div>
                  <div className="mt-2 md:mt-0 md:mr-12">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant={'outline'}>Alterar assinatura</Button>
                      </DialogTrigger>
                      <DialogContent className="flex flex-col w-[400px] h-[300px] justify-start bg-gray-800 border-gray-600 text-gray-200">
                        <p className="font-bold">
                          Realize aqui a sua nova assinatura
                        </p>
                        <div className="self-center w-[300px] h-[150px] ">
                          <SignatureDoctor
                            setOpen={setOpen}
                            onSave={fetchDoctorData}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between px-4 mt-4 gap-4">
                  <p className="text-center text-white font-bold">
                    Você ainda não cadastrou uma assinatura!
                  </p>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant={'outline'}>Cadastrar assinatura</Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col w-[400px] h-[300px] justify-start bg-gray-800 border-gray-600 text-gray-200">
                      <p className="font-bold">Realize aqui a sua assinatura</p>
                      <div className="self-center w-[300px] h-[150px] ">
                        <SignatureDoctor
                          setOpen={setOpen}
                          onSave={fetchDoctorData}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          )}

          <Button disabled={isSubmitting} className="mt-8">
            Salvar Informações
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default AccessConfiguration
