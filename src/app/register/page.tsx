import { MultiStep } from '@/components/multiStep'
import { Button } from '@/components/ui/button'

const Register = () => {
  return (
    <main className="max-w-[572px] mt-20 mx-auto mb-4 py-0 px-4">
      <div className="py-0 px-6">
        <strong className="text-2xl text-white">Bem-vindo ao AnestOn!</strong>
        <p className="mb-6">
          Para iniciarmos o seu cadastro, conecte o seu calendário para
          verificar automaticamente as horas ocupadas e as novas consultas à
          medida em que são agendados.
        </p>

        <MultiStep size={4} currentStep={1} />
      </div>

      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6">
        <div className="flex items-center justify-between border border-solid border-gray-600 py-4 px-16 rounded-md mb-2">
          oi
        </div>
        <Button variant="blocked">secondary</Button>
      </div>
    </main>
  )
}

export default Register
