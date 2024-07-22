/* eslint-disable camelcase */
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      // console.log(req)
      // const body = await req.json()

      // const { user_link } = body

      // const doctor = await prisma.user.findFirst({
      //   where: {
      //     user_link,
      //   },
      // })

      return new NextResponse('Internal Error', { status: 400 })

      // return NextResponse.json(doctor)
    }

    const isNotDoctor = session.user.doctor_id !== undefined

    if (isNotDoctor) {
      const doctor = await prisma.user.findFirst({
        where: {
          id: session.user.doctor_id,
        },
      })

      if (!doctor) {
        return new NextResponse('Internal Error', { status: 400 })
      }

      return NextResponse.json(doctor)
    }

    const doctor = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    })

    const thisUser = doctor

    return NextResponse.json(thisUser)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
