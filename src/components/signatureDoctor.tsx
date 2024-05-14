'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { useToast } from './ui/use-toast'

interface SignatureDoctorProps {
  setOpen: (open: boolean) => void
}

const getUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split('.').pop().trim()
}

const onImageEdit = async (imgUrl) => {
  const imgExt = getUrlExtension(imgUrl)

  const response = await fetch(imgUrl)
  const blob = await response.blob()
  const file = new File([blob], imgExt, {
    type: blob.type,
  })

  console.log(file)

  return file
}

export function SignatureDoctor({ setOpen }: SignatureDoctorProps) {
  const [sign, setSign] = useState()
  const [url, setUrl] = useState()
  const [isUploading, setIsUploading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const handleClear = () => {
    sign?.clear()
  }

  const handleGenerate = async (event) => {
    setUrl(sign?.getTrimmedCanvas().toDataURL('image/png'))

    const input = document.getElementById('file')
    if (input && url) input.setAttribute('value', url)

    await event.preventDefault()
    if (!input?.getAttribute('value')) return

    const file = await onImageEdit(url)

    const formData = new FormData()
    formData.append('file', file)

    try {
      setIsUploading(true)
      const { data } = await api.post('/s3-upload', formData)
      await api.put('/users', { signature_url: data.fileName })
      router.push('/configuration')
      toast({
        title: 'Assinatura cadastrada com sucesso!',
        variant: 'success',
      })
      setIsUploading(false)

      setOpen(false)

      // refreshSession() with new SignatureUrl
      const event = new Event('visibilitychange')
      document.dispatchEvent(event)
    } catch (err) {
      toast({
        title: 'Ocorreu um erro para cadastrar a assinatura!',
        variant: 'destructive',
      })
      console.log(err)
    }
  }

  // console.log(url)
  return (
    <div>
      <input type="file" id="file" className="hidden" accept="image/*" />
      <div className="items-center justify-center border-solid border-gray-600 border-2 bg-white">
        <SignatureCanvas
          canvasProps={{ width: 300, height: 150 }}
          ref={(data) => setSign(data)}
        />
      </div>
      <div className="flex justify-between p-2">
        <Button
          variant={'ghost'}
          className="w-32 hover:text-gray-400"
          onClick={handleClear}
        >
          Limpar
        </Button>
        <Button
          className="w-32"
          onClick={handleGenerate}
          disabled={isUploading}
        >
          Enviar
        </Button>
      </div>
    </div>
  )
}
