/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Patient } from '@/app/dashboard/columns'
import { api } from '@/lib/axios'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { roboto } from '../app/fonts'
interface Props {
  patient: Patient
}

const PrintableConsultationCertificateTemplate = React.forwardRef<
  HTMLDivElement,
  Props
>(({ patient }, ref) => {
  const scheduledData = patient?.id
    ? `${
        new Date(patient.schedule_date).getDate() < 10
          ? '0' + new Date(patient.schedule_date).getDate()
          : new Date(patient.schedule_date).getDate()
      }/${
        new Date(patient.schedule_date).getMonth() + 1 < 10
          ? '0' + (new Date(patient.schedule_date).getMonth() + 1)
          : new Date(patient.schedule_date).getMonth() + 1
      }/${new Date(patient.schedule_date).getFullYear()}`
    : ''

  const session = useSession()

  const [doctor, setDoctor] = useState({} as User)

  useEffect(() => {
    async function searchingDoctor() {
      const doctor = await api.get('doctor')
      setDoctor(doctor.data)
    }
    searchingDoctor()
  }, [session.data?.user.accessType, session.data?.user.doctor_id])

  return (
    <div className="h-0 hidden">
      <style type="text/css" media="print">
        {`@page { size: portrait, title: 'title' }`}
      </style>
      <div ref={ref} className={`${roboto.className} "w-full"`}>
        <div className="p-0 w-full">
          <div className="text-center text-xl font-bold mb-4">
            Comprovante de Realização de Consulta Pré-anestésica
          </div>
          <div className="flex flex-col border-[1px] border-gray-900  p-4">
            <p className="mb-8 md:mb-24">
              No dia {`${scheduledData}`} o(a) médico(a) {`${doctor.name}`}, CRM{' '}
              {`${doctor.crm}`}, realizou um teleatendimento com o(a) paciente{' '}
              {`${patient?.pacient_name}`}, CPF {`${patient?.pacient_cpf}`}.
              Este documento atesta a realização desta consulta mediante a
              assinatura abaixo.
            </p>

            <div className="w-full flex items-center justify-between px-4 mt-8">
              <div className="flex flex-col text-sm w-[40%] justify-center">
                <div className="flex w-[150px] h-full self-center justify-center">
                  {doctor.signature_url ? (
                    <Image
                      src={doctor.signature_url}
                      alt="signature"
                      width={150}
                      height={75}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className="w-full h-[2px] mt-6 px-6 bg-gray-900" />
                <p className="text-center">Assinatura do(a) Médico(a)</p>
                <p className="text-center">
                  Dr. {`${session.data?.user.name}`}
                </p>
              </div>

              <div className="flex flex-col text-sm w-[40%] justify-center">
                <div className="flex w-[150px] h-full self-center justify-center">
                  {patient.pacient_signature ? (
                    <Image
                      src={patient.pacient_signature}
                      alt="signature"
                      width={150}
                      height={75}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-full h-[2px] mt-6 px-6 bg-gray-900" />
                <p className="text-center">Assinatura do(a) Paciente</p>
                <p className="text-center">{`${patient?.pacient_name}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

PrintableConsultationCertificateTemplate.displayName =
  'PrintableConsultationCertificateTemplate'

export { PrintableConsultationCertificateTemplate }
