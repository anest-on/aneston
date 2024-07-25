/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { user_link: string } },
) {
  try {
    const user_link = params.user_link

    if (user_link) {
      // const { user_link } = body

      const doctor = await prisma.user.findFirst({
        where: {
          user_link,
        },
      })

      // return new NextResponse('Internal Error', { status: 400 })

      return NextResponse.json(doctor)
    }

    return new NextResponse('doctor not found', { status: 500 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
