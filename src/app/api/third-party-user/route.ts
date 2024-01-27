/* eslint-disable camelcase */
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

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
