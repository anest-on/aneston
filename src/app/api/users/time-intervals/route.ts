/* eslint-disable camelcase */
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Interval {
  start: number
  end: number
}

export async function POST(req: Request) {
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

      const oldSchedules = await prisma.userTimeInterval.findMany({
        where: {
          user_id: session.user.doctor_id,
        },
      })

      if (oldSchedules) {
        await prisma.daytimeInterval.deleteMany({
          where: {
            doctor_id: session.user.doctor_id,
          },
        })
        await prisma.userTimeInterval.deleteMany({
          where: {
            user_id: session.user.doctor_id,
          },
        })
      }

      const data = await req.json()

      // console.log(session.user?.id)

      await Promise.all(
        data.intervals.map(
          async (interval: {
            weekDay: number
            startTimeInMinutes: number
            endTimeInMinutes: number
            daytimeIntervals: Interval[]
          }) => {
            const intervalItem = await prisma.userTimeInterval.create({
              data: {
                week_day: interval.weekDay,
                time_start_in_minutes: interval.startTimeInMinutes,
                time_end_in_minutes: interval.endTimeInMinutes,
                appointment_time: data.appointmentTime,
                user_id: session.user.doctor_id,
              },
            })

            if (interval.daytimeIntervals.length !== 0)
              interval.daytimeIntervals.forEach(async (element) => {
                await prisma.daytimeInterval.create({
                  data: {
                    time_start_interval_in_minutes: element.start,
                    time_end_in_minutes: element.end,
                    interval_id: intervalItem.id,
                    doctor_id: session.user.doctor_id,
                  },
                })
              })
            return intervalItem
          },
        ),
      )

      return new NextResponse('Success', { status: 201 })
    }

    const oldSchedules = await prisma.userTimeInterval.findMany({
      where: {
        user_id: session.user.id,
      },
    })

    if (oldSchedules) {
      await prisma.daytimeInterval.deleteMany({
        where: {
          doctor_id: session.user.id,
        },
      })
      await prisma.userTimeInterval.deleteMany({
        where: {
          user_id: session.user.id,
        },
      })
    }

    const data = await req.json()

    // console.log(session.user?.id)

    await Promise.all(
      data.intervals.map(
        async (interval: {
          weekDay: number
          startTimeInMinutes: number
          endTimeInMinutes: number
          daytimeIntervals: Interval[]
        }) => {
          const intervalItem = await prisma.userTimeInterval.create({
            data: {
              week_day: interval.weekDay,
              time_start_in_minutes: interval.startTimeInMinutes,
              time_end_in_minutes: interval.endTimeInMinutes,
              appointment_time: data.appointmentTime,
              user_id: session.user.id,
            },
          })

          if (interval.daytimeIntervals.length !== 0)
            interval.daytimeIntervals.forEach(async (element) => {
              await prisma.daytimeInterval.create({
                data: {
                  time_start_interval_in_minutes: element.start,
                  time_end_in_minutes: element.end,
                  interval_id: intervalItem.id,
                  doctor_id: session.user.id,
                },
              })
            })
          return intervalItem
        },
      ),
    )

    return new NextResponse('Success', { status: 201 })
  } catch (error) {
    console.log('[USER_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await prisma.userTimeInterval.findMany({
      where: {
        user_id: session.user.id,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
