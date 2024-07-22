import { api } from '@/lib/axios'
import { FileSymlink } from 'lucide-react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

interface PatientSendEmailCertificateButtonProps {
  formId: string
  children?: React.ReactNode
  patientEmail: string
}

export default function PatientSendEmailCertificateButton({
  formId,
  patientEmail,
  children,
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
    <Button
      variant={'ghost'}
      className="hover:text-gray-40 w-full h-full gap-1 flex fles-row justify-start p-2"
      onClick={() => {
        sendEmail(formId)
      }}
      disabled={!patientEmail}
    >
      <FileSymlink className="w-4 h-4 hover:text-gray-400 hover:cursor-pointer" />
      {children}
    </Button>
  )
}
