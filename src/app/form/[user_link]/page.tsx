'use client'
import { api } from '@/lib/axios'
// import { prisma } from '@/lib/prisma'

import { User } from '@prisma/client'
import { useEffect, useState } from 'react'
import FormBody from './_components/formBody'

// eslint-disable-next-line camelcase
const Form = ({ params }: { params: { user_link: string } }) => {
  const [doctor, setDoctor] = useState({} as User)

  // const doctor = await prisma.user.findFirst({
  //   where: {
  //     user_link: params.user_link,
  //   },
  // })

  useEffect(() => {
    const apiSearch = async () => {
      const data = await api.get(`/doctor?user_link=${params.user_link}`)
      setDoctor(data.data)
    }
    apiSearch()
  }, [])

  console.log(doctor)

  if (doctor.name === '') {
    return (
      <main className="max-w-[572px] w-full items-center justify-center mt-20 mx-auto py-20 px-10">
        <div className="flex flex-col justify-center gap-5">
          <strong className="text-2xl text-white">
            Médico não Encontrado!
          </strong>
          <p>
            O link que você tentou acessar não corresponde a um médico
            registrado em nossa plataforma. Por favor, verifique o link
            fornecido ou entre em contato diretamente com seu anestesista para
            obter mais informações e assistência.
          </p>
        </div>
      </main>
    )
  }

  return (
    <FormBody
      doctor={{
        avatar_url: doctor && doctor.avatar_url ? doctor?.avatar_url : '',
        city: doctor && doctor.city ? doctor.city : '',
        name: doctor && doctor.name ? doctor.name : '',
        state: doctor && doctor?.state ? doctor.state : '',
        user_link: params.user_link,
        easy_scheduling: doctor.easy_scheduling,
      }}
    />
  )
}

export default Form
