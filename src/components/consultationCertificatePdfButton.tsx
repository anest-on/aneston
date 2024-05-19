import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { formPatientInterface } from '@/app/appointments-management/page'
import { Button } from './ui/button'
import { ScrollText } from 'lucide-react'
import { PrintableConsultationCertificateTemplate } from './printableConsultationCertificateTemplate'

interface ConsultationCertificatePdfButtonProps {
  patient: formPatientInterface
}

export default function ConsultationCertificatePdfButton({
  patient,
}: ConsultationCertificatePdfButtonProps) {
  const documentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: `Certificado de Consulta - ${patient.pacient_name}`,
    bodyClass: 'p-16',
  })

  return (
    <>
      <Button
        variant={'ghost'}
        className="p-0 h-[16px] hover:text-gray-400"
        onClick={() => {
          handlePrint()
        }}
      >
        <ScrollText className="w-4 h-4 hover:text-gray-400 hover:cursor-pointer" />
      </Button>
      <PrintableConsultationCertificateTemplate
        ref={documentRef}
        patient={patient}
      />
    </>
  )
}
