/* eslint-disable camelcase */
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, password, confirmPassword, accessType, doctorId } = body

  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !accessType ||
    !doctorId
  ) {
    return new NextResponse('Complete os campos faltantes', { status: 400 })
  }

  const userExists = await prisma.user.findUnique({
    where: {
      doctor_id: doctorId,
      email,
    },
  })

  if (userExists) {
    return new NextResponse('Internal Error', { status: 400 })
  }

  console.log(userExists)

  const hashedPassword = await bcrypt.hash(password, 10)
  const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)

  const thirdPartyUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      confirm_password: hashedConfirmPassword,
      access_type: accessType,
      doctor_id: doctorId,
    },
  })

  await prisma.account.create({
    data: {
      user_id: thirdPartyUser.id,
      provider: 'credentials',
      providerAccountId: randomUUID(),
    },
  })

  return NextResponse.json(thirdPartyUser)
}

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const thirPartyUsers = await prisma.user.findMany({
      where: {
        doctor_id: session.user.id,
      },
    })

    return NextResponse.json(thirPartyUsers)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const body = await req.json()
    const { email, doctorId } = body

    const userExists = await prisma.user.findUnique({
      where: {
        doctor_id: doctorId,
        email,
      },
    })

    if (!userExists) {
      return new NextResponse('Internal Error', { status: 400 })
    }

    const account = await prisma.account.findFirst({
      where: {
        user_id: userExists.id,
      },
    })

    if (!account) {
      return new NextResponse('Internal Error', { status: 400 })
    }

    await prisma.account.delete({ where: { id: account.id } })

    const deletedUser = await prisma.user.delete({
      where: {
        id: userExists.id,
      },
    })

    return NextResponse.json(deletedUser)
  } catch (err) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name, email, password, confirmPassword, accessType, doctorId } =
      body

    const user = await prisma.user.update({
      where: {
        email,
        doctor_id: doctorId,
      },
      data: {
        name,
        email,
        password,
        confirm_password: confirmPassword,
        access_type: accessType,
        doctor_id: doctorId,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
