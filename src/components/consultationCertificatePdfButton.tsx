import { Patient } from '@/app/dashboard/columns'
import { ScrollText } from 'lucide-react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { PrintableConsultationCertificateTemplate } from './printableConsultationCertificateTemplate'
import { Button } from './ui/button'

interface ConsultationCertificatePdfButtonProps {
  patient: Patient
  children?: React.ReactNode
}

export default function ConsultationCertificatePdfButton({
  patient,
  children,
}: ConsultationCertificatePdfButtonProps) {
  const documentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: `Certificado de Consulta - ${patient.pacient_name}`,
    bodyClass: 'p-16',
  })

  return (
    <Button
      variant={'ghost'}
      className="hover:text-gray-40 w-full h-full gap-1 flex fles-row justify-start p-2"
      onClick={() => {
        handlePrint()
      }}
    >
      <ScrollText className="w-4 h-4 hover:text-gray-400 hover:cursor-pointer" />
      {children}
      <PrintableConsultationCertificateTemplate
        ref={documentRef}
        patient={patient}
      />
    </Button>
  )
}
