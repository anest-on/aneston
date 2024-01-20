'use client'

import { DateFormItem } from '@/components/DateFormItem'
import { MultiStep } from '@/components/multiStep'
import CompanionPage from '@/components/page/companionPage'
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

        <MultiStep size={3} currentStep={2} />

        <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid gap-4 border-gray-600 mt-6">
          <h3 className="text-white text-[1.2rem]">
            <b>Dados de Identificação do Acompanhante/Familiar</b>
          </h3>

          <CompanionPage />
        </div>
      </div>
    </main>
  )
}

export default Questionary