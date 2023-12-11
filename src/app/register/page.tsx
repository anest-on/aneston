import { MultiStep } from '@/components/multiStep'

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

        <MultiStep size={5} currentStep={2} />
      </div>
    </main>
  )
}

export default Register
