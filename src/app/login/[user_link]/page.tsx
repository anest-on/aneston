import logoNameSide from '@/images/logoNameSide.svg'

import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { LoginForm } from './_components/login-form'
import { ButtonHome } from './_components/button-home'

const Login = async ({ params }: { params: { user_link: string } }) => {
  const doctor = await prisma.user.findFirst({
    where: {
      user_link: params.user_link,
    },
  })

  return (
    <>
      <div className="w-screen h-screen bg-gray-900">
        {doctor && (
          <main className="max-w-[572px] pt-20 pb-20 mx-auto py-0 px-4 ">
            <div className="py-0 px-6 w-full justify-center">
              <Image
                src={logoNameSide}
                width={263}
                className="mx-auto mb-6"
                alt=""
              />
              <p className="mb-6 text-center text-lg text-white">
                Conta principal:{' '}
                <span className="underline">{doctor?.name}</span>
              </p>
            </div>
            <LoginForm doctorId={doctor?.id} />
          </main>
        )}
        {!doctor && (
          <main className="max-w-[572px] h-screen w-full items-center justify-center mx-auto py-40 px-10">
            <div className="flex flex-col justify-center gap-5">
              <strong className="text-2xl text-white">
                Anestesista não encontrado!
              </strong>
              <p>
                O anestesista associado a esta conta não possui uma conta ativa
                em nossa plataforma. Por favor, verifique o link inserido e
                certifique-se de que está correto.
              </p>
            </div>
            <ButtonHome />
          </main>
        )}
      </div>
    </>
  )
}

export default Login
