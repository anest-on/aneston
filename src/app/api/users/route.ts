/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await req.json()

    const userLinkAlreadyExists = await prisma.user.findFirst({
      where: {
        user_link: data.user_link,
      },
    })

    if (userLinkAlreadyExists && userLinkAlreadyExists.id !== session.user.id) {
      return new NextResponse('Internal Error', { status: 400 })
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...data,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.log('[USER_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  await prisma.session.deleteMany({
    where: {
      user_id: session.user.id,
    },
  })

  return new NextResponse('Success', { status: 201 })
}
