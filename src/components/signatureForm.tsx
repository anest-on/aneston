'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

interface signatureProps {
  formId: string
}

const getUrlExtension = (url: string) => {
  return url?.split(/[#?]/)[0]?.split('.')?.pop()?.trim()
}

const onImageEdit = async (imgUrl: string) => {
  const imgExt = getUrlExtension(imgUrl)

  const response = await fetch(imgUrl)
  const blob = await response.blob()

  if (!imgExt) return
  const file = new File([blob], imgExt, {
    type: blob.type,
  })

  return file
}

export function SignatureForm({ formId }: signatureProps) {
  const [sign, setSign] = useState()
  const [url, setUrl] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)

  const router = useRouter()

  useEffect(() => {
    console.log(sign?.isEmpty())
  }, [sign])
  // const [file, setFile] = useState(null)

  // const handleFileChange = (event) => {
  //   console.log('vamos testar')
  //   setFile(event.target.files[0])
  // }

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

    const getFormId = formId

    try {
      setIsUploading(true)
      const { data } = await api.post('/s3-upload', formData)
      await api.patch('/form', {
        id: getFormId,
        pacient_signature: data.fileName,
      })
      router.push(`/consultation-certificate/${getFormId}/success`)
    } catch (err) {
      console.log(err)
    }
  }

  // console.log(url)
  return (
    <div>
      <input type="file" id="file" className="hidden" accept="image/*" />
      <div className="items-center justify-center border-solid border-gray-600 border-2">
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
