import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const s3Client = new S3Client({
  region: process.env.S3_REGION as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
})

async function uploadFileToS3(buffer: Buffer) {
  const fileBuffer = buffer

  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: `${Date.now()}`,
    Body: fileBuffer,
    ContentType: 'image/png',
  }

  try {
    const command = new PutObjectCommand(params)
    await s3Client.send(command)
  } catch (err) {
    console.log(err)
  }

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
    const fileName = await uploadFileToS3(buffer)

    return NextResponse.json({ fileName })
  } catch (err) {
    return NextResponse.json({ err })
  }
}
