'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()

  const padRef = React.useRef<SignatureCanvas>(null)

  const handleClear = () => {
    padRef.current?.clear()
  }

  const handleGenerate = async (event: React.SyntheticEvent<EventTarget>) => {
    const settingUrl = padRef.current?.getTrimmedCanvas().toDataURL('image/png')

    if (!settingUrl) return

    const input = document.getElementById('file')
    if (input) input.setAttribute('value', settingUrl)

    event.preventDefault()
    if (!input?.getAttribute('value')) return

    const file = await onImageEdit(settingUrl)

    if (!file) return

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
          ref={padRef}
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
