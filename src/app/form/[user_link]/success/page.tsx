import { prisma } from '@/lib/prisma'

const Form = async ({ params }: { params: { user_link: string } }) => {
  const doctor = await prisma.user.findFirst({
    where: {
      user_link: params.user_link,
    },
  })
  return (
    <main className="max-w-[800px] justify-center items-center mx-auto my-20  ">
      <div className="py-0 px-0">
        <div className="px-4">
          <strong className="text-2xl text-white">
            Formulário enviado com sucesso!
          </strong>
          <p className="mb-6">
            Em breve o Dr {doctor?.name} entrará em contato para agendar sua
            consulta.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Form
