'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ButtonHome = () => {
  const router = useRouter()

  return (
    <Button className="w-full mt-6" onClick={() => router.push('/')}>
      <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Tela Inicial
    </Button>
  )
}
