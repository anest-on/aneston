import { auth } from '@/auth'
import { EmailTemplate } from '@/components/email-template'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const isNotDoctor = session.user.doctor_id !== undefined
    const completeAccess = session.user.accessType === 'FULL_ACCESS'

    const { formId } = await req.json()

    const form = await prisma.form.findFirst({
      where: {
        id: formId,
      },
    })

    if (!form) {
      return new NextResponse('This form does not exist', { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'AnestOn <contato@matheusadorno.com>',
      to: form.pacient_email,
      subject: 'AnestOn - Certificado de Consulta',
      html: '',
      react: EmailTemplate({
        firstName: form.pacient_name,
        message: session.user.message,
        consultationCertificate: `https://aneston.vercel.app/consultation-certificate/${form.id}`,
      }),
    })

    console.log(form.pacient_email)

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
