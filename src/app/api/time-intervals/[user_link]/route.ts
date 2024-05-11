/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

type dayTimeIntervalProps = {
  time_start_in_minutes: number
  time_end_in_minutes: number
}

interface userTimeIntervalsGetResponse {
  id: string
  week_day: number
  time_start_in_minutes: number
  time_end_in_minutes: number
  appointment_time: number
  user_id: string
  day_time_intervals: dayTimeIntervalProps[]
  created_at: Date
  updated_at: Date
}

export async function GET(
  req: NextRequest,
  { params }: { params: { user_link: string } },
) {
  console.log('chegou')
  try {
    const user_link = String(params.user_link)
    const user = await prisma.user.findFirst({
      where: {
        user_link,
      },
    })

    const userTimeIntervals = await prisma.userTimeInterval.findMany({
      where: {
        user_id: user?.id,
      },
    })

    const dayTimeIntervals = await prisma.daytimeInterval.findMany({
      where: {
        doctor_id: user?.id,
      },
    })

    const data: userTimeIntervalsGetResponse[] = []

    userTimeIntervals.forEach((timeInterval) => {
      const dayTimeIntervalRepsonse: dayTimeIntervalProps[] = []

      dayTimeIntervals.forEach((dayTimeInterval) => {
        if (timeInterval.id === dayTimeInterval.interval_id) {
          dayTimeIntervalRepsonse.push({
            time_start_in_minutes:
              dayTimeInterval.time_start_interval_in_minutes,
            time_end_in_minutes: dayTimeInterval.time_end_in_minutes,
          })
        }
      })

      data.push({
        id: timeInterval.id,
        week_day: timeInterval.week_day,
        time_start_in_minutes: timeInterval.time_start_in_minutes,
        time_end_in_minutes: timeInterval.time_end_in_minutes,
        appointment_time: timeInterval.appointment_time,
        user_id: timeInterval.user_id,
        day_time_intervals: dayTimeIntervalRepsonse,
        created_at: timeInterval.created_at,
        updated_at: timeInterval.updated_at,
      })
    })

    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
