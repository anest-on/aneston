import { prisma } from '@/lib/prisma'

const consultationCertificateSuccess = async ({
  params,
}: {
  params: { form_id: string }
}) => {
  const form = await prisma.form.findFirst({
    where: {
      id: params.form_id,
    },
  })

  const doctor = await prisma.user.findFirst({
    where: {
      id: form?.doctor_id,
    },
  })

  return (
    <main className="max-w-[800px] justify-center items-center mx-auto my-20  ">
      <div className="py-0 px-0">
        <div className="px-4">
          <strong className="text-2xl text-white">
            Formulário assinado com sucesso!
          </strong>
          <p className="mb-6">
            Muito obrigado por ter realizado sua consulta com o Dr.{' '}
            {doctor?.name}. Caso tenha alguma dúvida, entre em contato com o seu
            médico.
          </p>
        </div>
      </div>
    </main>
  )
}

export default consultationCertificateSuccess
