'use client'

import { MultiStep } from '@/components/multiStep'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'

const Register = () => {
  const session = useSession()
  const pathName = useSearchParams()

  const hasAuthError = !!pathName.get('error')
  const isSignedIn = session.status === 'authenticated'

  const router = useRouter()

  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <main className="max-w-[572px] h-screen mt-20 mx-auto mb-4 py-0 px-4">
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
        <div className="flex items-center justify-between border border-solid border-gray-600 py-4 px-6 rounded-md mb-4">
          <p>Google Calendar</p>
          {isSignedIn ? (
            <Button variant="blocked">
              Conectado <Check className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button variant="outline" onClick={handleConnectCalendar}>
              Conectar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        {hasAuthError && !isSignedIn && (
          <p className="text-sm text-[#F75A68] mb-4">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </p>
        )}
        {isSignedIn ? (
          <Button onClick={() => router.push('/register/update-informations')}>
            Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="blocked">
            Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </main>
  )
}

export default Register
