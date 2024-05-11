import { prisma } from '@/lib/prisma'

const consultationCertificate = async ({
  params,
}: {
  params: { form_id: string }
}) => {
  const form = await prisma.form.findFirst({
    where: {
      id: params.form_id,
    },
  })

  return (
    <main className="max-w-[1024px] h-full md:h-screen w-full items-center justify-center mt-4 mx-auto py-8 px-4">
      <div className="flex flex-col justify-center gap-1">
        <strong className="text-2xl text-center text-white">
          Certificação de Realização de Consulta
        </strong>
        <p className="text-center">
          Para conseguirmos validar a realização da sua consulta, pedimos que
          você assine o documento abaixo:
        </p>
        <div className="flex flex-col bg-white items-center justify-center border border-solid border-red-600 rounded-md p-10 text-gray-900 mt-4">
          <strong className="text-xl md:text-2xl text-center">
            Certificação de Realização de Consulta
          </strong>
          <div className="flex flex-col bg-white items-center justify-center border border-solid border-gray-400 rounded-md p-6 mt-4">
            <p className="mb-8 md:mb-24">
              No dia DD/MM/YYYY o medico Vitor Felippe, CRM 1029310923, realizou
              um teleatendimento. O paciente, {`${form?.pacient_name}`}, CPF
              {`${form?.pacient_cpf}`}, confirma a realização da mesma através
              da assinatura nesse documento.
            </p>

            <div className="mt-10 md:mt-24 w-full flex flex-col md:flex-row items-center justify-between px-12">
              <div className="text-sm w-56 lg:w-72">
                <div className="w-full h-[2px] mt-6 px-6 bg-gray-900" />
                <p className="text-center">Assinatura do Médico</p>
                <p className="text-center">Dr. Vitor Felippe</p>
              </div>

              <div className="text-sm w-56 mt-10 md:mt-0 lg:w-72">
                <div className="w-full h-[2px] mt-6 px-6 bg-gray-900" />
                <p className="text-center">Assinatura do Paciente</p>
                <p className="text-center">Matheus Ribeiro Adorno Silva</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default consultationCertificate
