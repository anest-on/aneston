import { prisma } from '@/lib/prisma'
import FormBody from './_components/formBody'

const Form = async ({ params }: { params: { user_link: string } }) => {
  const doctor = await prisma.user.findFirst({
    where: {
      user_link: params.user_link,
    },
  })

  if (!doctor) {
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
        easy_scheduling:
          doctor && doctor.easy_scheduling ? doctor.easy_scheduling : true,
      }}
    />
  )
}

export default Form
