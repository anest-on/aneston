import { MultiStep } from '@/components/multiStep'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight } from 'lucide-react'

const Register = () => {
  return (
    <main className="max-w-[572px] mt-20 mx-auto mb-4 py-0 px-4">
      <div className="py-0 px-6">
        <strong className="text-2xl text-white">
          Atualize suas informações
        </strong>
        <p className="mb-6">
          Já coletamos as informações essenciais para criar sua conta com base
          nos dados fornecidos pela sua Conta Google. No entanto, se desejar
          fazer alguma edição em qualquer um desses detalhes, você pode fazê-lo
          imediatamente!
        </p>

        <MultiStep size={4} currentStep={2} />
      </div>

      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6 gap-4">
        <div className="flex flex-col">
          <Label>Seu Link</Label>
          <Input prefix="aneston.com/" />
        </div>

        <div className="flex flex-col">
          <Label>Seu Nome</Label>
          <Input />
        </div>

        <div className="flex flex-col">
          <Label className="mb-0">Seu E-mail</Label>
          <p className="text-gray-200 text-xs mb-2">
            Caixa que deseja receber as notificações sobre seus pacientes
          </p>
          <Input />
        </div>

        <div className="flex">
          <div className="flex flex-col w-full mr-4">
            <Label>Sua Cidade</Label>
            <Input />
          </div>
          <div className="flex w-full flex-col">
            <Label>Seu Estado</Label>
            <Input />
          </div>
        </div>

        <Button>
          Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}

export default Register
