import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { formPatientInterface } from '@/app/appointments-management/page'
import { Button } from './ui/button'
import { FileText } from 'lucide-react'
import { PrintablePatientTemplate } from './printablePatientTemplate'

interface patientInfosPdfButtonProps {
  patient: formPatientInterface
}

export default function PatientInfosPdfButton({
  patient,
}: patientInfosPdfButtonProps) {
  const documentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: `Informações do Paciente - ${patient.pacient_name}`,
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
        <FileText className="w-4 h-4 hover:text-gray-400 hover:cursor-pointer" />
      </Button>
      <PrintablePatientTemplate ref={documentRef} patient={patient} />
    </>
  )
}
