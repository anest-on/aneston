import { FileSignature } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface PatientSignNowButtonProps {
  formId: string
  children?: React.ReactNode
}

export default function PatientSignNowButton({
  formId,
  children,
}: PatientSignNowButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    // router.push(`/consultation-certificate/${formId}`)
    window.open(`/consultation-certificate/${formId}`, '_blank')
  }

  return (
    <Button
      variant={'ghost'}
      className="hover:text-gray-40 w-full h-full gap-1 flex fles-row justify-start p-2"
      onClick={handleClick}
    >
      <FileSignature className="w-4 h-4 hover:text-gray-400 hover:cursor-pointer" />
      {children}
    </Button>
  )
}
