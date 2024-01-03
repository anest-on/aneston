/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const oldSchedules = await prisma.userTimeInterval.findMany({
      where: {
        user_id: session.user.id,
      },
    })

    if (oldSchedules) {
      await prisma.userTimeInterval.deleteMany({
        where: {
          user_id: session.user.id,
        },
      })
    }

    const data = await req.json()

    await Promise.all(
      data.intervals.map(
        (interval: {
          weekDay: number
          startTimeInMinutes: number
          endTimeInMinutes: number
        }) => {
          return prisma.userTimeInterval.create({
            data: {
              week_day: interval.weekDay,
              time_start_in_minutes: interval.startTimeInMinutes,
              time_end_in_minutes: interval.endTimeInMinutes,
              appointment_time: data.appointmentTime,
              user_id: session.user?.id,
            },
          })
        },
      ),
    )

    return new NextResponse('Success', { status: 201 })
  } catch (error) {
    console.log('[USER_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
