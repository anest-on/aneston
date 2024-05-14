import { prisma } from '@/lib/prisma'
import { SignatureForm } from '@/components/signatureForm'
import Image from 'next/image'

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

  const doctor = await prisma.user.findFirst({
    where: {
      id: form?.doctor_id,
    },
  })

  const scheduledData = form?.id
    ? `${
        new Date(form.schedule_date).getDate() < 10
          ? '0' + new Date(form.schedule_date).getDate()
          : new Date(form.schedule_date).getDate()
      }/${
        new Date(form.schedule_date).getMonth() + 1 < 10
          ? '0' + (new Date(form.schedule_date).getMonth() + 1)
          : new Date(form.schedule_date).getMonth() + 1
      }/${new Date(form.schedule_date).getFullYear()}`
    : ''

  return (
    <>
      {form?.id ? (
        <main className="max-w-[1024px] h-full md:h-screen w-full items-center justify-center mt-4 mx-auto py-8 px-4 mb-10">
          <div className="flex flex-col justify-center gap-1">
            <strong className="text-2xl text-center text-white">
              Certificação de Realização de Consulta
            </strong>

            <p className="text-center">
              Para conseguirmos validar a realização da sua consulta, pedimos
              que você assine o documento abaixo:
            </p>
            <div className="flex flex-col bg-white items-center justify-center border border-solid border-red-600 rounded-md p-10 text-gray-900 mt-4">
              <strong className="text-xl md:text-2xl text-center">
                Certificação de Realização de Consulta
              </strong>
              <div className="flex flex-col bg-white items-center justify-center border border-solid border-gray-400 rounded-md p-6 mt-4">
                <p className="mb-8 md:mb-24">
                  No dia {scheduledData} o(a) médico(a) {`${doctor?.name}`}, CRM{' '}
                  {`${doctor?.crm}`}, realizou um teleatendimento com o(a)
                  paciente {`${form?.pacient_name}`}, CPF{' '}
                  {`${form?.pacient_cpf}`}. Este documento atesta a realização
                  desta consulta mediante a assinatura abaixo.
                </p>

                <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between px-4 md:gap-8">
                  <div className="text-sm ">
                    <div className="w-[300px] h-[150px] self-center md:self-start">
                      {doctor?.signature_url ? (
                        <Image
                          src={doctor?.signature_url}
                          alt="signature"
                          width={300}
                          height={150}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="w-full h-[2px] mt-6 px-6 bg-gray-900" />
                    <p className="text-center">Assinatura do(a) Médico(a)</p>
                    <p className="text-center">Dr. {`${doctor?.name}`}</p>
                  </div>

                  <div className="text-sm  mt-10 md:mt-0 ">
                    <div>
                      {form?.id ? <SignatureForm formId={form?.id} /> : <></>}
                    </div>
                    <div className="w-full h-[2px] mt-6 px-6 bg-gray-900" />
                    <p className="text-center">Assinatura do(a) Paciente</p>
                    <p className="text-center">{`${form?.pacient_name}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-[800px] h-screen justify-center mx-auto my-20 pt-40">
          <div className="py-0 px-0">
            <div className="px-4">
              <strong className="text-2xl text-white">
                Formulário não encontrado!
              </strong>
              <p className="mb-6">
                Entre em contato com o seu médico para conseguir um Link de
                formulário válido!
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default consultationCertificate
