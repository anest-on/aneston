import { MultiStep } from '@/components/multiStep'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Register = () => {
  return (
    <main className="max-w-[572px] mt-20 mb-20 mx-auto py-0 px-4">
      <div className="py-0 px-6">
        <strong className="text-2xl text-white">
          Já está quase terminando!
        </strong>
        <p className="mb-6">
          Defina agora os horários que você tem disponível para realizar os seus
          atendimentos.
        </p>

        <MultiStep size={4} currentStep={3} />
      </div>

      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6 gap-4">
        <div className="flex items-center justify-between border border-solid border-gray-600 py-4 px-6 rounded-md mb-4">
          <p>Possui intervalos ao longo do dia?</p>
          <Button variant="outline">Personalizar horários</Button>
        </div>
        <Button>
          Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}

export default Register
