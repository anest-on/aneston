'use client'

import { DateFormItem } from '@/components/DateFormItem'
import { MultiStep } from '@/components/multiStep'
import { RadioFormItem } from '@/components/radioFormItem'
import { SingleTextFormSubItem } from '@/components/singleTextFormSubItem'
import { TextFormItem } from '@/components/textFormItem'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Questionary = () => {
  const router = useRouter()

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

        <MultiStep size={3} currentStep={1} />

        <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid gap-4 border-gray-600 mt-6">
          <h3 className="text-white text-[1.2rem]">
            <b>Dados de Identificação do Paciente</b>
          </h3>

          <TextFormItem>Qual seu nome?</TextFormItem>

          <DateFormItem> Qual a sua data de nascimento?</DateFormItem>

          <RadioFormItem
            value={[
              'Masculino',
              'Feminino',
              'Prefiro não me indentificar',
              'Outro',
            ]}
            defaultValue={'Masculino'}
          >
            Qual seu sexo?
          </RadioFormItem>

          <TextFormItem>Qual seu e-mail?</TextFormItem>

          <TextFormItem>Qual seu número de celular (WhatsApp)?</TextFormItem>

          <RadioFormItem value={['Sim', 'Não']} accept="Sim">
            O senhor(a) possui algum plano de saúde?
            <SingleTextFormSubItem>
              Qual o nome do seu plano de saúde?
            </SingleTextFormSubItem>
            <SingleTextFormSubItem>
              Qual seu número de matrícula?
            </SingleTextFormSubItem>
          </RadioFormItem>

          <div className="flex flex-row w-full justify-between px-5">
            <Button variant={'blocked'} className="w-[150px]">
              Voltar
            </Button>
            <Button
              variant={'default'}
              className="w-[150px]"
              onClick={() => router.push('/questionary/companion')}
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
