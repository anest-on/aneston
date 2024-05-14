import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { api } from '@/lib/axios'

const s3Client = new S3Client({
  region: process.env.S3_REGION as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
})

async function uploadFileToS3(buffer: Buffer, fileName: string) {
  const fileBuffer = buffer

  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: `${fileName}-${Date.now()}`,
    Body: fileBuffer,
    ContentType: 'image/png',
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  const fixedUrl = `https://${params.Bucket}.s3.${process.env.S3_REGION}.amazonaws.com/`
  const encodedUrl = encodeURIComponent(`${params.Key}`)
  const finalUrl = `${fixedUrl}${encodedUrl}`

  return finalUrl
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ err: 'File is required.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = await uploadFileToS3(buffer, file.name)

    return NextResponse.json({ fileName })
  } catch (err) {
    return NextResponse.json({ err })
  }
}
