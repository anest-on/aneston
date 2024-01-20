'use client'
import { useRouter } from 'next/navigation'

import { TextFormItem } from '@/components/textFormItem'
import { DateFormItem } from '@/components/DateFormItem'
import { RadioFormItem } from '@/components/radioFormItem'
import { SingleTextFormSubItem } from '@/components/singleTextFormSubItem'
import { Button } from '@/components/ui/button'
import { SelectFormItem } from '../selectFormItem'
import { TextListFormSubItem } from '../textListFormSubItem'
import { CheckboxFormItem } from '../checkboxFormItem'
import { TreeTextFieldsFormItem } from '../treeTextFieldsFormItem'
import { DoubleTextListFormSubItem } from '../doubleTextListFormSubItem'
import { RadioFormSubItem } from '../radioFormSubItem'

export default function CirurgyPage() {
  const router = useRouter()

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

  return (
    <>
      <SelectFormItem value={cirurgies}>
        Qual tipo de cirurgia o senhor(a) vai realizar?
      </SelectFormItem>

      <TextFormItem>
        Qual o nome do cirurgião que irá realizar a sua cirurgia?
      </TextFormItem>

      <TextFormItem>Qual o seu peso? (peso em kg)</TextFormItem>

      <TextFormItem>Qual a sua altura? (altura em m)</TextFormItem>

      <RadioFormItem value={['Sim', 'Não']} accept="Sim">
        O senhor(a) possui alguma alergia alimentar ou farmacológica?
        <TextListFormSubItem placeholder="Alergia">
          Qual alergia você possui?
        </TextListFormSubItem>
      </RadioFormItem>

      <CheckboxFormItem value={cardiacSymptoms}>
        O senhor(a) possui alguma das seguintes condições cardíaca?
        <SingleTextFormSubItem>Descreva</SingleTextFormSubItem>
      </CheckboxFormItem>

      <RadioFormItem value={['Sim', 'Não']} accept="Sim">
        Além das condições cardíacas, o senhor(a) possui alguma outra doença?
        <TextListFormSubItem placeholder="Doença">
          Quais outras doenças o senhor(a) possui?
        </TextListFormSubItem>
      </RadioFormItem>

      <TreeTextFieldsFormItem
        defaultValue={[
          'Nome do medicamento',
          'Dose (mg ou mcg)',
          'N° de comprimidos por dia',
        ]}
      >
        O senhor(a) faz uso de algum remédio regularmente?
      </TreeTextFieldsFormItem>

      <RadioFormItem value={['Sim', 'Não']} accept="Sim">
        O senhor(a) fez uso de antibióticos nos últimos 6 meses?
        <TextListFormSubItem placeholder="Antibiótico">
          Qual antibiótico usou no último mês?
        </TextListFormSubItem>
      </RadioFormItem>

      <RadioFormItem value={['Sim', 'Não']} accept="Sim">
        O senhor(a) já realizou alguma cirurgia anteriormente?
        <DoubleTextListFormSubItem
          defaultValue={['Nome da cirurgia', 'Ano de realização']}
        >
          Qual cirurgia e quando realizou?
        </DoubleTextListFormSubItem>
      </RadioFormItem>

      <RadioFormItem value={['Sim', 'Não']} accept="Sim">
        O senhor(a) é/era fumante?
        <SingleTextFormSubItem>
          Começou a fumar com quantos anos?
        </SingleTextFormSubItem>
        <RadioFormSubItem value={['Sim', 'Não']}>
          Já parou de fumar?
        </RadioFormSubItem>
        <SingleTextFormSubItem>
          Com quantos anos parou de fumar?
        </SingleTextFormSubItem>
        <SingleTextFormSubItem>
          Quantos maços fuma/fumava por dia?
        </SingleTextFormSubItem>
      </RadioFormItem>

      <RadioFormItem value={['Sim', 'Não']} accept="Sim">
        O senhor(a) pratica alguma atividade física?
        <DoubleTextListFormSubItem
          defaultValue={['Nome da atividade', 'Frequencia por semana']}
        >
          Qual atividade e quantas vezes na semana?
        </DoubleTextListFormSubItem>
      </RadioFormItem>

      <RadioFormItem value={['Sim', 'Não']} accept="Sim">
        O senhor(a) já apresentou alguma complicação anestésica?
        <TextListFormSubItem placeholder="Complicação">
          Qual(ais) complicação(ões)?
        </TextListFormSubItem>
      </RadioFormItem>

      <RadioFormItem value={['Sim', 'Não']} accept="Sim">
        Gostaria de receber um resumo do procedimento que irá realizar?
      </RadioFormItem>

      <div className="flex flex-row w-full justify-between px-5">
        <Button
          variant={'circle'}
          className="w-[150px] rounded-md"
          onClick={() => router.push('/form/companion')}
        >
          Voltar
        </Button>
        <Button
          variant={'default'}
          className="w-[150px]"
          onClick={() => router.push('/form/cirurgy')}
        >
          Continuar
        </Button>
      </div>
    </>
  )
}
