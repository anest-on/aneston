'use client'

import { MultiStep } from '@/components/multiStep'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter()

  return (
    <main className="max-w-[800px] mt-20 mb-20 mx-auto py-0 px-4">
      <div className="flex w-full justify-center">
        <div className="max-w-[572px] py-0 px-6">
          <strong className="text-2xl text-white">
            Agora é só escolher o seu plano!
          </strong>
          <p className="mb-6">
            Para finalizar, escolha o seu plano no AnestOn! Lembrando que você
            ganhará <b>15 dias gratuitos</b> para testar a plataforma e pode
            cancelar o seu plano a qualquer momento antes do término do período
            de testes.
          </p>

          <MultiStep size={4} currentStep={4} />
        </div>
      </div>

      <div className="flex max-lg:flex-col items-start justify-center gap-10 mt-6">
        <div className="flex flex-col w-full items-center gap-8 py-11 px-6 rounded-lg bg-gray-800 border  border-gray-600">
          <p className="font-bold text-2xl text-white">Plano Mensal</p>
          <div className="flex items-start text-white font-bold">
            <p className="text-2xl">R$</p>
            <p className="text-8xl mt-[-10px]">99</p>
            <div className="text-2xl flex flex-col gap-2">
              <p>,90</p>
              <p>/mês</p>
            </div>
          </div>

          <div className="flex flex-col mt-[-20px]">
            <p>* A cobrança é realizada mensalmente.</p>
            <p>* Receba 15 dias gratuitos para testar.</p>
          </div>
          <Button onClick={() => router.push('/not-found')}>
            Escolher Plano
          </Button>
        </div>

        <div className="flex flex-col w-full items-center gap-8 py-8 px-6 rounded-lg bg-gray-800 border  border-gray-600">
          <p className="font-bold text-2xl text-white">Plano Anual</p>
          <div className="flex items-start text-white font-bold">
            <p className="text-2xl">R$</p>
            <p className="text-8xl mt-[-10px]">999</p>
            <div className="text-2xl flex flex-col gap-2">
              <p>,90</p>
              <p>/mês</p>
            </div>
          </div>

          <div className="flex flex-col mt-[-20px]">
            <p>* Receba 2 meses gratuitos.</p>
            <p>* A cobrança é realizada mensalmente.</p>
            <p>* Receba 15 dias gratuitos para testar.</p>
          </div>
          <Button onClick={() => router.push('/not-found')}>
            Escolher Plano
          </Button>
        </div>
      </div>

      <div className="flex flex-col mt-6 items-center justify-center gap-6">
        <p className="text-xs ">
          * Ao assinar qualquer um dos planos, seus primeiros 15 dias serão
          gratuitos e você pode cancelá-lo a qualquer momento antes da primeira
          cobrança, que ocorrerá após o período de testes.
        </p>
      </div>
    </main>
  )
}

export default Register
