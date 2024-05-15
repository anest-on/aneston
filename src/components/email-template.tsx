import * as React from 'react'

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
  <div>
    <h1>Olá, {firstName}!</h1>
    <p>{message}</p>
    <a href={consultationCertificate}>Link para o certificado de consulta</a>
  </div>
)
