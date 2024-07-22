/* eslint-disable camelcase */
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

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

  const isNotDoctor = session.user.doctor_id !== undefined
  const completeAccess = session.user.accessType === 'FULL_ACCESS'

  if (isNotDoctor) {
    if (!completeAccess) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userExists = await prisma.user.findUnique({
      where: {
        doctor_id: session.user.doctor_id,
        email,
      },
    })

    if (userExists) {
      return new NextResponse('Internal Error', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)

    const thirdPartyUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        confirm_password: hashedConfirmPassword,
        access_type: accessType,
        doctor_id: session.user.doctor_id,
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

  const userExists = await prisma.user.findUnique({
    where: {
      doctor_id: doctorId,
      email,
    },
  })

  if (userExists) {
    return new NextResponse('Internal Error', { status: 400 })
  }

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

    const isNotDoctor = session.user.doctor_id !== undefined
    const completeAccess = session.user.accessType === 'FULL_ACCESS'

    if (isNotDoctor) {
      if (!completeAccess) {
        return new NextResponse('Unauthorized', { status: 401 })
      }
      const thirPartyUsers = await prisma.user.findMany({
        where: {
          doctor_id: session.user.doctor_id,
        },
      })

      return NextResponse.json(thirPartyUsers)
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

    const isNotDoctor = session.user.doctor_id !== undefined
    const completeAccess = session.user.accessType === 'FULL_ACCESS'

    if (isNotDoctor) {
      if (!completeAccess) {
        return new NextResponse('Unauthorized', { status: 401 })
      }

      const userExists = await prisma.user.findUnique({
        where: {
          doctor_id: session.user.doctor_id,
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
    }

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

    const isNotDoctor = session.user.doctor_id !== undefined
    const completeAccess = session.user.accessType === 'FULL_ACCESS'

    if (isNotDoctor) {
      if (!completeAccess) {
        return new NextResponse('Unauthorized', { status: 401 })
      }
      const user = await prisma.user.update({
        where: {
          email,
          doctor_id: session.user.doctor_id,
        },
        data: {
          name,
          email,
          password,
          confirm_password: confirmPassword,
          access_type: accessType,
          doctor_id: session.user.doctor_id,
        },
      })
      return NextResponse.json(user)
    }

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
