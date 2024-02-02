'use client'

import { MultiStep } from '@/components/multiStep'
import CompanionPage, {
  companionSubmitProps,
} from '@/components/page/companionPage'
import PacientPage, { pacientSubmitProps } from '@/components/page/pacientPage'
import CirurgyPage, { cirurgySubmitProps } from '@/components/page/cirurgyPage'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Questionary = () => {
  const [pacientData, setPacientData] = useState<pacientSubmitProps | null>(
    null,
  )

  const [companionData, setCompanionData] =
    useState<companionSubmitProps | null>(null)

  const [cirurgyData, setCirurgyData] = useState<cirurgySubmitProps | null>(
    null,
  )

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)

  function handleCirurgySubmit(values: cirurgySubmitProps | null) {
    if (values) {
      setCirurgyData(values)
      setStep(4)
    } else {
      setStep(2)
    }
  }

  function handleCompanionSubmit(values: companionSubmitProps | null) {
    if (values) {
      setCompanionData(values)
      setStep(3)
    } else {
      setStep(1)
    }
  }

  function handlePacientSubmit(values: pacientSubmitProps | null) {
    if (values) {
      setStep(2)
      setPacientData(values)
    }
  }

  useEffect(() => {
    console.log(pacientData)
    console.log(companionData)
    console.log(cirurgyData)

    // pacientData && companionData
    //   ? setStep(3)
    //   : pacientData && !companionData
    //     ? setStep(2)
    //     : setStep(1)
  }, [cirurgyData, companionData, pacientData])

  return (
    <main className="max-w-[800px] justify-center items-center mx-auto my-20  ">
      <div className="py-0 px-0">
        <div className="px-4">
          <strong className="text-2xl text-white">
            Avaliação de Risco Pré-Operatório
          </strong>
          <p className="mb-6">
            Este formulário tem o objetivo de coletar informações essenciais
            para avaliar o risco anestésico e de complicações durante
            procedimentos cirúrgicos. Suas respostas nos ajudarão a garantir a
            sua segurança e bem-estar antes, durante e após a cirurgia. Por
            favor, preencha-o com precisão e atenção. Suas respostas são
            confidenciais e essenciais para um cuidado médico de alta qualidade.
          </p>

          <MultiStep size={3} currentStep={1} />
        </div>

        <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid gap-4 border-gray-600 mt-6">
          <h3 className="text-white text-[1.2rem]">
            <b>Dados de Identificação do Paciente</b>
          </h3>

          {
            {
              1: (
                <PacientPage
                  getPacientData={handlePacientSubmit}
                  setPacientData={pacientData}
                />
              ),
              2: (
                <CompanionPage
                  getCompanionData={handleCompanionSubmit}
                  setCompanionData={companionData}
                />
              ),
              3: (
                <CirurgyPage
                  getCirurgyData={handleCirurgySubmit}
                  setCirurgyData={cirurgyData}
                />
              ),
              4: <Button onClick={() => setStep(3)}>Voltar</Button>,
              5: 'confirmation in progress',
            }[step]
          }
        </div>
      </div>
    </main>
  )
}

export default Questionary
