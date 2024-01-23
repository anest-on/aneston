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

const formSchema = z.object({
  pacient_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  pacient_birthdate: z.string().optional(),
  pacient_gender: z.string(),
  pacient_email: z.string().optional(),
  pacient_number: z.string().optional(),
  pacient_healthInsurance: z.string().optional(),
  pacient_healthInsuranceName: z.string().optional(),
  pacient_healthInsuranceId: z.string().optional(),
})

export default function PacientPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const handleInputChange = (value: string) => {
    // console.log(value)
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
                <TextFormItem inputValue={handleInputChange} {...field}>
                  Qual seu nome?
                </TextFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <DateFormItem name="pacient_birthdate" inputValue={handleInputChange}>
          Qual a sua data de nascimento?
        </DateFormItem>

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
                  inputValue={handleInputChange}
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

        <TextFormItem name="pacient_email" inputValue={handleInputChange}>
          Qual seu e-mail?
        </TextFormItem>

        <TextFormItem name="pacient_number" inputValue={handleInputChange}>
          Qual seu número de celular (WhatsApp)?
        </TextFormItem>

        <FormField
          control={form.control}
          name="pacient_healthInsurance"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioFormItem
                  OptionValues={['Sim', 'Não']}
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  inputValue={handleInputChange}
                >
                  O senhor(a) possui algum plano de saúde?
                  <SingleTextFormSubItem
                    name="pacient_healthInsuranceName"
                    inputValue={handleInputChange}
                  >
                    Qual o nome do seu plano de saúde?
                  </SingleTextFormSubItem>
                  <SingleTextFormSubItem
                    name="pacient_healthInsuranceId"
                    inputValue={handleInputChange}
                  >
                    Qual seu número de matrícula?
                  </SingleTextFormSubItem>
                </RadioFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-row w-full justify-between px-5">
          <Button variant={'blocked'} className="w-[150px]">
            Voltar
          </Button>
          <Button variant={'default'} className="w-[150px]" type="submit">
            Continuar
          </Button>
        </div>
      </form>
    </Form>
  )
}
