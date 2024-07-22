/* eslint-disable prettier/prettier */
'use client'

import { MultiStep } from '@/components/multiStep'
import TimeIntervals from '@/components/timeIntervalsRegister'

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

        <MultiStep size={3} currentStep={3} />
      </div>

      <TimeIntervals />
    </main>
  )
}

export default Register
