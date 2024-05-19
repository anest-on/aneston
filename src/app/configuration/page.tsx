/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { SignatureDoctor } from '@/components/signatureDoctor'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

const settingsSchema = z.object({
  message: z.string(),
  easy_scheduling: z.boolean(),
})

type SettingsData = z.infer<typeof settingsSchema>

const AccessConfiguration = () => {
  const session = useSession()
  const { toast } = useToast()
  const doctor = session.data?.user

  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      message: session.data?.user.message || '',
      easy_scheduling: session.data?.user.easy_scheduling,
    },
  })

  const { isSubmitting } = form.formState

  const handleUpdateSettings = async (data: SettingsData) => {
    try {
      await api.put('/users', data)
      toast({
        title: 'Informação atualizada com sucesso!',
        variant: 'success',
      })
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
            <div className="flex justify-between">
              <p className="text-white font-bold">
                Agendamento de consulta facilitado
              </p>
              <FormField
                control={form.control}
                name="easy_scheduling"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        disabled={isSubmitting}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <p>
              Ao ativar o paciente pode agendar sua consulta ao acessar o
              formulário. Ao final será perguntado o dia e a hora que deseja
              realizar a consulta
            </p>
          </div>

          <div className="flex flex-col mt-12 gap-2">
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

          {(session.data?.user.accessType === '' ||
            session.data?.user.accessType === null) && (
            <div className="flex flex-col mt-12 gap-2 ">
              <div className="md:flex gap-10">
                <p className="text-white font-bold">Assinatura</p>
              </div>
              <p>
                Assinatura que ficará registrada na Certificação de Realização
                de Consulta.
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
                          <SignatureDoctor setOpen={setOpen} />
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
                        <SignatureDoctor setOpen={setOpen} />
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
