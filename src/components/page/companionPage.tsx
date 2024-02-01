'use client'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { TextFormItem } from '@/components/textFormItem'
import { DateFormItem } from '@/components/DateFormItem'
import { RadioFormItem } from '@/components/radioFormItem'
import { SingleTextFormSubItem } from '@/components/singleTextFormSubItem'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  companion_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  companion_kinship: z.string(),
  companion_email: z.string().email(),
  companion_number: z.string(),
})

export interface companionSubmitProps {
  companion_name: string
  companion_kinship: string
  companion_email: string
  companion_number: string
}

interface companionPageProps {
  setCompanionData: companionSubmitProps | null
  getCompanionData: (value: companionSubmitProps | null) => void
}

export default function CompanionPage({
  getCompanionData,
  setCompanionData,
}: companionPageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companion_name: setCompanionData?.companion_name,
      companion_kinship: setCompanionData?.companion_kinship,
      companion_email: setCompanionData?.companion_email,
      companion_number: setCompanionData?.companion_number,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    getCompanionData(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="companion_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextFormItem {...field}>
                    Qual o nome do seu acompanhante/familiar?
                  </TextFormItem>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companion_kinship"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextFormItem {...field}>
                    Qual o seu parentesco com o paciente?
                  </TextFormItem>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companion_email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextFormItem {...field}>
                    Qual o e-mail do acompanhante?
                  </TextFormItem>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companion_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextFormItem {...field}>
                    Qual o numero de celular (WhatsApp) do acompanhante?
                  </TextFormItem>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-row w-full justify-between lg:px-5 max-lg:gap-3">
            <Button
              variant={'circle'}
              className="w-[150px] rounded-md"
              onClick={() => getCompanionData(null)}
            >
              Voltar
            </Button>
            <Button variant={'default'} className="w-[150px]" type="submit">
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
