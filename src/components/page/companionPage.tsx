'use client'
import { useRouter } from 'next/navigation'

import { TextFormItem } from '@/components/textFormItem'
import { DateFormItem } from '@/components/DateFormItem'
import { RadioFormItem } from '@/components/radioFormItem'
import { SingleTextFormSubItem } from '@/components/singleTextFormSubItem'
import { Button } from '@/components/ui/button'

export default function CompanionPage() {
  const router = useRouter()

  return (
    <>
      <TextFormItem>Qual o nome do seu acompanhante/familiar?</TextFormItem>

      <TextFormItem>Qual o seu parentesco com o paciente?</TextFormItem>

      <TextFormItem>Qual o e-mail do acompanhante?</TextFormItem>

      <TextFormItem>
        Qual o numero de celular (WhatsApp) do acompanhante?
      </TextFormItem>

      <div className="flex flex-row w-full justify-between px-5">
        <Button
          variant={'circle'}
          className="w-[150px] rounded-md"
          onClick={() => router.push('/form/pacient')}
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
