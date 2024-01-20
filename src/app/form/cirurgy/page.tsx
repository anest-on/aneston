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
import CirurgyPage from '@/components/page/cirurgyPage'

const Questionary = () => {
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
          <CirurgyPage />
        </div>
      </div>
    </main>
  )
}

export default Questionary
