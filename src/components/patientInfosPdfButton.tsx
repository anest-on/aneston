import { Patient } from '@/app/dashboard/columns'
import { FileText } from 'lucide-react'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { PrintablePatientTemplate } from './printablePatientTemplate'
import { Button } from './ui/button'

interface patientInfosPdfButtonProps {
  patient: Patient
  children?: React.ReactNode
}

export default function PatientInfosPdfButton({
  patient,
  children,
}: patientInfosPdfButtonProps) {
  const documentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: `Informações do Paciente - ${patient.pacient_name}`,
    bodyClass: 'p-16',
  })

  return (
    <Button
      variant={'ghost'}
      className="w-full h-full gap-1 flex fles-row justify-start p-2"
      onClick={() => {
        handlePrint()
      }}
    >
      <FileText className="w-4 h-4 hover:cursor-pointer" />
      {children}
      <PrintablePatientTemplate ref={documentRef} patient={patient} />
    </Button>
  )
}
