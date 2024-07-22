import Image from 'next/image'
import * as React from 'react'

import logoNameSide from '@/images/logoNameSide.svg'

interface EmailTemplateProps {
  firstName: string
  message: string
  consultationCertificate: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message,
  consultationCertificate,
}) => (
  <div className="flex justify-center h-full w-screen bg-gray-900 text-gray-200 text-base">
    <p>Olá, {firstName}!</p>
    <p>{message}</p>
    <a href={consultationCertificate}>Assinar Certificado de Consulta</a>
  </div>
)
