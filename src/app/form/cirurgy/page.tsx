'use client'

import { DateFormItem } from '@/components/DateFormItem'
import { SelectFormItem } from '@/components/selectFormItem'
import { MultiStep } from '@/components/multiStep'
import { RadioFormItem } from '@/components/radioFormItem'
import { SingleTextFormSubItem } from '@/components/singleTextFormSubItem'
import { TextFormItem } from '@/components/textFormItem'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { TextListFormSubItem } from '@/components/textListFormSubItem'
import { CheckboxFormItem } from '@/components/checkboxFormItem'
import { TreeTextFieldsFormItem } from '@/components/treeTextFieldsFormItem'
import { DoubleTextListFormSubItem } from '@/components/doubleTextListFormSubItem'
import { RadioFormSubItem } from '@/components/radioFormSubItem'

const Questionary = () => {
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
    <main className="max-w-[800px]  mx-auto my-20 px-4 ">
      <div className="py-0 px-6">
        <strong className="text-2xl text-white">
          Avaliação de Risco Pré-Operatório
        </strong>
        <p className="mb-6">
          Este formulário tem o objetivo de coletar informações essenciais para
          avaliar o risco anestésico e de complicações durante procedimentos
          cirúrgicos. Suas respostas nos ajudarão a garantir a sua segurança e
          bem-estar antes, durante e após a cirurgia. Por favor, preencha-o com
          precisão e atenção. Suas respostas são confidenciais e essenciais para
          um cuidado médico de alta qualidade.
        </p>

        <MultiStep size={3} currentStep={3} />

        <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid gap-4 border-gray-600 mt-6">
          <h3 className="text-white text-[1.2rem]">
            <b>Informações importantes para a cirurgia</b>
          </h3>

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
            Além das condições cardíacas, o senhor(a) possui alguma outra
            doença?
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
        </div>
      </div>
    </main>
  )
}

export default Questionary
