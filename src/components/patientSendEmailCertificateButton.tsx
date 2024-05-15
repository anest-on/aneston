import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { formPatientInterface } from '@/app/appointments-management/page'
import { Button } from './ui/button'
import { FileSymlink } from 'lucide-react'
import { PrintablePatientTemplate } from './printablePatientTemplate'
import { api } from '@/lib/axios'
import { useToast } from './ui/use-toast'

interface PatientSendEmailCertificateButtonProps {
  formId: string
}

export default function PatientSendEmailCertificateButton({
  formId,
}: PatientSendEmailCertificateButtonProps) {
  const { toast } = useToast()

  async function sendEmail(formId: string) {
    try {
      await api.post('/send', { formId })
      toast({
        title: 'E-mail enviado com sucesso!',
        variant: 'success',
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Button
        variant={'ghost'}
        className="p-0 h-[16px] hover:text-gray-400"
        onClick={() => {
          sendEmail(formId)
        }}
      >
        <FileSymlink className="w-4 h-4 hover:text-gray-400 hover:cursor-pointer" />
      </Button>
    </>
  )
}
