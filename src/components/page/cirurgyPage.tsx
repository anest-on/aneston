'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { TextFormItem } from '@/components/textFormItem'
import { RadioFormItem } from '@/components/radioFormItem'
import { SingleTextFormSubItem } from '@/components/singleTextFormSubItem'
import { Button } from '@/components/ui/button'
import { SelectFormItem } from '../selectFormItem'
import { TextListFormSubItem } from '../textListFormSubItem'
import { CheckboxFormItem, resposnseCheckboxProps } from '../checkboxFormItem'
import { TreeTextFieldsFormItem } from '../treeTextFieldsFormItem'
import {
  DoubleTextInputProps,
  DoubleTextListFormSubItem,
} from '../doubleTextListFormSubItem'
import { RadioFormSubItem } from '../radioFormSubItem'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

const cirurgySchema = z.object({
  name: z.string(),
  year: z.string(),
})

const medicinesSchema = z.object({
  name: z.string(),
  dose: z.string(),
  pills: z.string(),
})

const physicalActivitySchema = z.object({
  name: z.string(),
  frequency: z.string(),
})

const heartConditionsSchema = z.object({
  value: z.string(),
  checked: z.boolean(),
})

const formSchema = z.object({
  cirurgy_name: z.string().optional(),
  cirurgy_physician: z.string().optional(),
  pacient_weight: z.string().optional(),
  pacient_height: z.string().optional(),
  pacient_allergy: z.string().optional(),
  pacient_allergy_names: z.string().array().optional(),
  pacient_heart_conditions: z.string().array().optional(),
  pacient_heart_conditions_observation: z.string().optional(),
  pacient_disease: z.string().optional().optional(),
  pacient_disease_names: z.string().array().optional(),
  pacient_medicines: z.array(medicinesSchema).optional(),
  pacient_antibiotic: z.string().optional().optional(),
  pacient_antibiotics_names: z.string().array().optional(),
  pacient_did_cirurgy: z.string().optional(),
  pacient_cirurgies: z.array(cirurgySchema).optional(),
  pacient_smoke: z.string().optional(),
  pacient_started_smoking: z.string().optional(),
  pacient_stopped_smoking: z.string().optional(),
  pacient_when_stop_smoking: z.string().optional(),
  pacient_pack_smoke: z.string().optional(),
  pacient_do_physical_activity: z.string().optional(),
  pacient_physical_activity: z.array(physicalActivitySchema).optional(),
  pacient_has_anesthetic_complication: z.string().optional(),
  pacient_anesthetic_complications: z.string().array().optional(),
  pacient_procedure_summary: z.string().optional(),
})

export type cirurgySubmitProps = z.infer<typeof formSchema>

interface cirurgyPageProps {
  setCirurgyData: cirurgySubmitProps | null
  getCirurgyData: (value: cirurgySubmitProps | null) => void
}

export default function CirurgyPage({
  getCirurgyData,
  setCirurgyData,
}: cirurgyPageProps) {
  const [pacientAllergyStyle, setPacientAllergyStyle] = useState(['', 'hidden'])
  const [pacientCardiacConditionStyle, setPacientCardiacConditionStyle] =
    useState(['', 'hidden'])
  const [pacientCardiacDiseaseStyle, setPacientCardiacDiseaseStyle] = useState([
    '',
    'hidden',
  ])
  const [pacientAtibioticStyle, setPacientAtibioticStyle] = useState([
    '',
    'hidden',
  ])
  const [pacientCirurgyStyle, setPacientCirurgyStyle] = useState(['', 'hidden'])
  const [pacientSmokeStyle, setPacientSmokeStyle] = useState(['', 'hidden'])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cirurgy_name: setCirurgyData?.cirurgy_name,
      cirurgy_physician: setCirurgyData?.cirurgy_physician,
      pacient_weight: setCirurgyData?.pacient_weight,
      pacient_height: setCirurgyData?.pacient_height,
      pacient_allergy: setCirurgyData?.pacient_allergy,
      pacient_allergy_names: setCirurgyData?.pacient_allergy_names,
      pacient_heart_conditions: setCirurgyData?.pacient_heart_conditions,
      pacient_heart_conditions_observation:
        setCirurgyData?.pacient_heart_conditions_observation,
      pacient_disease: setCirurgyData?.pacient_disease,
      pacient_disease_names: setCirurgyData?.pacient_disease_names,
      pacient_medicines: setCirurgyData?.pacient_medicines,
      pacient_antibiotic: setCirurgyData?.pacient_antibiotic,
      pacient_antibiotics_names: setCirurgyData?.pacient_antibiotics_names,
      pacient_did_cirurgy: setCirurgyData?.pacient_did_cirurgy,
      pacient_cirurgies: setCirurgyData?.pacient_cirurgies,
      pacient_smoke: setCirurgyData?.pacient_smoke,
      pacient_started_smoking: setCirurgyData?.pacient_started_smoking,
      pacient_stopped_smoking: setCirurgyData?.pacient_stopped_smoking,
      pacient_when_stop_smoking: setCirurgyData?.pacient_when_stop_smoking,
      pacient_pack_smoke: setCirurgyData?.pacient_pack_smoke,
      pacient_do_physical_activity:
        setCirurgyData?.pacient_do_physical_activity,
      pacient_physical_activity: setCirurgyData?.pacient_physical_activity,
      pacient_has_anesthetic_complication:
        setCirurgyData?.pacient_has_anesthetic_complication,
      pacient_anesthetic_complications:
        setCirurgyData?.pacient_anesthetic_complications,
      pacient_procedure_summary: setCirurgyData?.pacient_procedure_summary,
    },
  })

  const cardiacSymptoms = [
    'Stent',
    'Arritmia',
    'Infarto',
    'Insuficiência cardiaca',
    'Marca-passo',
  ]

  const cirurgies = [
    'Geral',
    'Vascular ',
    'Cardiaca',
    'Ortopédica',
    'Oftalmológica',
    'Dermatológica',
    'Ginecológica',
    'Urológica',
    'Oncológica',
    'Neurológica',
    'Plastica',
    'Dor intervencionista',
    'Obstétrica',
    'Exames',
    'Outra',
  ]

  const handleInputChange = (
    value: boolean,
    setStyle: Dispatch<SetStateAction<string[]>>,
  ) => {
    if (value === true) {
      setStyle(() => ['rounded-b-none', ''])
    } else {
      setStyle(() => ['', 'hidden'])
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    getCirurgyData(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cirurgy_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SelectFormItem OptionValues={cirurgies} {...field}>
                  Qual tipo de cirurgia o senhor(a) vai realizar?
                </SelectFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cirurgy_physician"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextFormItem {...field}>
                  Qual o nome do cirurgião que irá realizar a sua cirurgia?
                </TextFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pacient_weight"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextFormItem {...field}>
                  Qual o seu peso? (peso em kg)
                </TextFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pacient_height"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextFormItem {...field}>
                  Qual a sua altura? (altura em m)
                </TextFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="pacient_allergy"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioFormItem
                    OptionValues={['Sim', 'Não']}
                    accept="Sim"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    inputValue={(value: boolean) =>
                      handleInputChange(value, setPacientAllergyStyle)
                    }
                    className={pacientAllergyStyle[0]}
                  >
                    O senhor(a) possui alguma alergia alimentar ou
                    farmacológica?
                  </RadioFormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`${pacientAllergyStyle[1]} bg-gray-800 w-full px-5 py-3 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]`}
          >
            <FormField
              control={form.control}
              name="pacient_allergy_names"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextListFormSubItem placeholder="Alergia" {...field}>
                      Qual alergia você possui?
                    </TextListFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="pacient_heart_conditions"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CheckboxFormItem
                    OptionValues={cardiacSymptoms}
                    // onChange={field.onChange}
                    onChange={field.onChange}
                    inputValue={(value: boolean) =>
                      handleInputChange(value, setPacientCardiacConditionStyle)
                    }
                    className={pacientCardiacConditionStyle[0]}
                  >
                    O senhor(a) possui alguma das seguintes condições cardíaca?
                  </CheckboxFormItem>
                </FormControl>
              </FormItem>
            )}
          />

          <div
            className={`${pacientCardiacConditionStyle[1]} bg-gray-800 w-full px-5 py-3 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]`}
          >
            <FormField
              control={form.control}
              name="pacient_heart_conditions_observation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleTextFormSubItem {...field}>
                      Descreva
                    </SingleTextFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="pacient_disease"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioFormItem
                    OptionValues={['Sim', 'Não']}
                    accept="Sim"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    inputValue={(value: boolean) =>
                      handleInputChange(value, setPacientCardiacDiseaseStyle)
                    }
                    className={pacientCardiacDiseaseStyle[0]}
                  >
                    Além das condições cardíacas, o senhor(a) possui alguma
                    outra doença?
                  </RadioFormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`${pacientCardiacDiseaseStyle[1]} bg-gray-800 w-full px-5 py-3 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]`}
          >
            <FormField
              control={form.control}
              name="pacient_disease_names"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextListFormSubItem placeholder="Doença" {...field}>
                      Quais outras doenças o senhor(a) possui?
                    </TextListFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="pacient_medicines"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TreeTextFieldsFormItem
                  OptionValues={{
                    name: 'Nome do medicamento',
                    dose: 'Dose (mg ou mcg)',
                    pills: 'N° de comprimidos por dia',
                  }}
                  name={field.name}
                  ref={field.ref}
                  defaultValue={field.value}
                  onChange={field.onChange}
                >
                  O senhor(a) faz uso de algum remédio regularmente?
                </TreeTextFieldsFormItem>
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="pacient_antibiotic"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioFormItem
                    OptionValues={['Sim', 'Não']}
                    accept="Sim"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    inputValue={(value: boolean) =>
                      handleInputChange(value, setPacientAtibioticStyle)
                    }
                    className={pacientAtibioticStyle[0]}
                  >
                    O senhor(a) fez uso de antibióticos nos últimos 6 meses?
                  </RadioFormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`${pacientAtibioticStyle[1]} bg-gray-800 w-full px-5 py-3 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]`}
          >
            <FormField
              control={form.control}
              name="pacient_antibiotics_names"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextListFormSubItem placeholder="Antibiótico" {...field}>
                      Qual antibiótico usou no último mês?
                    </TextListFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="pacient_did_cirurgy"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioFormItem
                    OptionValues={['Sim', 'Não']}
                    accept="Sim"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    inputValue={(value: boolean) =>
                      handleInputChange(value, setPacientCirurgyStyle)
                    }
                    className={pacientCirurgyStyle[0]}
                  >
                    O senhor(a) já realizou alguma cirurgia anteriormente?
                  </RadioFormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`${pacientCirurgyStyle[1]} bg-gray-800 w-full px-5 py-3 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]`}
          >
            <FormField
              control={form.control}
              name="pacient_cirurgies"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DoubleTextListFormSubItem
                      OptionValues={{
                        input1: 'Nome da cirurgia',
                        input2: 'Ano de realização',
                      }}
                      name={field.name}
                      ref={field.ref}
                      defaultValue={() => {
                        const fieldValue: DoubleTextInputProps[] = []
                        field.value &&
                          field.value.forEach((element) => {
                            fieldValue.push({
                              input1: element.name,
                              input2: element.year,
                            })
                          })
                        field.onChange(fieldValue)
                        return fieldValue
                      }}
                      onChange={(value: DoubleTextInputProps[]) => {
                        const fieldValue: z.infer<typeof cirurgySchema>[] = []
                        value.forEach((element) => {
                          fieldValue.push({
                            name: element.input1,
                            year: element.input2,
                          })
                        })
                        field.onChange(fieldValue)
                      }}
                    >
                      Qual cirurgia e quando realizou?
                    </DoubleTextListFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="pacient_smoke"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioFormItem
                    OptionValues={['Sim', 'Não']}
                    accept="Sim"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    inputValue={(value: boolean) =>
                      handleInputChange(value, setPacientSmokeStyle)
                    }
                    className={pacientSmokeStyle[0]}
                  >
                    O senhor(a) é/era fumante?
                  </RadioFormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`${pacientSmokeStyle[1]} bg-gray-800 w-full px-5 py-3 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]`}
          >
            <FormField
              control={form.control}
              name="pacient_started_smoking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleTextFormSubItem {...field}>
                      Começou a fumar com quantos anos?
                    </SingleTextFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pacient_stopped_smoking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioFormSubItem
                      OptionValues={['Sim', 'Não']}
                      name={field.name}
                      ref={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      Já parou de fumar?
                    </RadioFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pacient_when_stop_smoking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleTextFormSubItem {...field}>
                      Com quantos anos parou de fumar?
                    </SingleTextFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pacient_pack_smoke"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleTextFormSubItem {...field}>
                      Quantos maços fuma/fumava por dia?
                    </SingleTextFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="pacient_do_physical_activity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioFormItem
                    OptionValues={['Sim', 'Não']}
                    accept="Sim"
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    inputValue={(value: boolean) =>
                      handleInputChange(value, setPacientCirurgyStyle)
                    }
                    className={pacientCirurgyStyle[0]}
                  >
                    O senhor(a) pratica alguma atividade física?
                  </RadioFormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={`${pacientCirurgyStyle[1]} bg-gray-800 w-full px-5 py-3 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]`}
          >
            <FormField
              control={form.control}
              name="pacient_physical_activity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DoubleTextListFormSubItem
                      OptionValues={{
                        input1: 'Nome da atividade',
                        input2: 'Frequencia por semana',
                      }}
                      name={field.name}
                      ref={field.ref}
                      defaultValue={() => {
                        const fieldValue: DoubleTextInputProps[] = []
                        field.value &&
                          field.value.forEach((element) => {
                            fieldValue.push({
                              input1: element.name,
                              input2: element.year,
                            })
                          })
                        field.onChange(fieldValue)
                        return fieldValue
                      }}
                      onChange={(value: DoubleTextInputProps[]) => {
                        const fieldValue: z.infer<typeof cirurgySchema>[] = []
                        value.forEach((element) => {
                          fieldValue.push({
                            name: element.input1,
                            year: element.input2,
                          })
                        })
                        field.onChange(fieldValue)
                      }}
                    >
                      Qual atividade e quantas vezes na semana?
                    </DoubleTextListFormSubItem>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <RadioFormItem OptionValues={['Sim', 'Não']} accept="Sim">
          O senhor(a) já apresentou alguma complicação anestésica?
          <TextListFormSubItem placeholder="Complicação">
            Qual(ais) complicação(ões)?
          </TextListFormSubItem>
        </RadioFormItem>

        <RadioFormItem OptionValues={['Sim', 'Não']} accept="Sim">
          Gostaria de receber um resumo do procedimento que irá realizar?
        </RadioFormItem>

        <div className="flex flex-row w-full justify-between px-5">
          <Button
            variant={'circle'}
            className="w-[150px] rounded-md"
            onClick={() => getCirurgyData(null)}
          >
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
