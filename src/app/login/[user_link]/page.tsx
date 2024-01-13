import logoNameSide from '@/images/logoNameSide.svg'

import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { LoginForm } from './_components/login-form'

const Register = async ({ params }: { params: { user_link: string } }) => {
  const doctor = await prisma.user.findFirst({
    where: {
      user_link: params.user_link,
    },
  })

  // const router = useRouter()

  return (
    <main className="max-w-[572px] mt-20 mb-20 mx-auto py-0 px-4">
      <div className="py-0 px-6 w-full justify-center">
        <Image src={logoNameSide} width={263} className="mx-auto mb-6" alt="" />
        <p className="mb-6 text-center text-lg">
          Conta principal: <span className="underline">{doctor?.name}</span>
        </p>
      </div>
      <LoginForm />
    </main>
  )
}

export default Register
