'use client'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { useState } from 'react'

const formSchema = z.object({
  pacient_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  pacient_birthdate: z.string(),
  pacient_gender: z.string(),
  pacient_email: z.string().email(),
  pacient_number: z.string(),
  pacient_healthInsurance: z.string(),
  pacient_healthInsuranceName: z.string().optional(),
  pacient_healthInsuranceId: z.string().optional(),
})

export interface pacientSubmitProps {
  pacient_name: string
  pacient_birthdate: string
  pacient_gender: string
  pacient_email: string
  pacient_number: string
  pacient_healthInsurance: string
  pacient_healthInsuranceName?: string
  pacient_healthInsuranceId?: string
}

interface pacientPageProps {
  setPacientData: pacientSubmitProps | null
  getPacientData: (value: pacientSubmitProps | null) => void
}

export default function PacientPage({
  getPacientData,
  setPacientData,
}: pacientPageProps) {
  const [handleHalthInsuranceChanges, setHandleHalthInsuranceChanges] =
    useState(['', 'hidden'])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pacient_name: setPacientData?.pacient_name,
      pacient_birthdate: setPacientData?.pacient_birthdate,
      pacient_gender: setPacientData?.pacient_gender,
      pacient_email: setPacientData?.pacient_email,
      pacient_number: setPacientData?.pacient_number,
      pacient_healthInsurance: setPacientData?.pacient_healthInsurance,
      pacient_healthInsuranceName: setPacientData?.pacient_healthInsuranceName,
      pacient_healthInsuranceId: setPacientData?.pacient_healthInsuranceId,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    getPacientData(values)
  }

  const handleInputChange = (value: string) => {
    if (value === 'Sim') {
      setHandleHalthInsuranceChanges(() => ['rounded-b-none', ''])
    } else {
      setHandleHalthInsuranceChanges(() => ['', 'hidden'])
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="pacient_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextFormItem {...field}>Qual seu nome?</TextFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pacient_birthdate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DateFormItem {...field}>
                  Qual a sua data de nascimento?
                </DateFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pacient_gender"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioFormItem
                  OptionValues={[
                    'Masculino',
                    'Feminino',
                    'Prefiro não me indentificar',
                    'Outro',
                  ]}
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                >
                  Qual seu sexo?
                </RadioFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pacient_email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextFormItem {...field}>Qual seu e-mail?</TextFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pacient_number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextFormItem {...field}>
                  Qual seu número de celular (WhatsApp)?
                </TextFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="pacient_healthInsurance"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioFormItem
                    OptionValues={['Sim', 'Não']}
                    accept={'Sim'}
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    inputValue={handleInputChange}
                    className={handleHalthInsuranceChanges[0]}
                  >
                    O senhor(a) possui algum plano de saúde?
                  </RadioFormItem>
                </FormControl>
              </FormItem>
            )}
          />

          <div
            className={`${handleHalthInsuranceChanges[1]} bg-gray-800 w-full px-5 py-3 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]`}
          >
            <FormField
              control={form.control}
              name="pacient_healthInsuranceName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleTextFormSubItem {...field}>
                      Qual o nome do seu plano de saúde?
                    </SingleTextFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pacient_healthInsuranceId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleTextFormSubItem {...field}>
                      Qual seu número de matrícula?
                    </SingleTextFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-row w-full justify-center px-5">
          <Button variant={'default'} className="w-[150px]" type="submit">
            Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}
