/* eslint-disable camelcase */
import { getWeekDays } from '@/utils/get-week-days'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export type dayTimeIntervalProps = {
  time_start_in_minutes: number
  time_end_in_minutes: number
}

export interface userTimeIntervalsGetResponse {
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

interface CalendarProps {
  selectedDate?: userTimeIntervalsGetResponse[] | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().locale(ptBr).set('date', 1)
  })

  const [weekDays, setWeekDays] = useState<string[]>()

  useEffect(() => {
    const data: string[] = []

    selectedDate?.forEach((e) => {
      switch (e.week_day) {
        case 0:
          return data.push('domingo')

        case 1:
          return data.push('segunda-feira')

        case 2:
          return data.push('terça-feira')

        case 3:
          return data.push('quarta-feira')

        case 4:
          return data.push('quinta-feira')

        case 5:
          return data.push('sexta-feira')

        case 6:
          return data.push('sábado')
      }
    })

    setWeekDays(() => data)
  }, [selectedDate])

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            !weekDays?.includes(date.locale(ptBr).format('dddd')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, weekDays, selectedDate])

  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[280px]">
      <div className="flex items-center justify-between">
        <p className="font-medium capitalize text-white">
          {currentDate.format('MMMM')}{' '}
          <span className="text-gray-200">{currentDate.format('YYYY')}</span>
        </p>

        <div className="flex gap-2 text-gray-200">
          <Button
            variant="ghost"
            onClick={handlePreviousMonth}
            title="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={handleNextMonth} title="Next Month">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <table className="w-full border-spacing-1 table-fixed">
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th className="text-gray-200 font-medium text-sm" key={weekDay}>
                {weekDay}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="before:content-['.'] before:leading-3 before:block before:text-gray-900">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td className="box-border" key={date.toString()}>
                      <button
                        className="w-[95%] mb-1 aspect-square text-white bg-gray-600 item-center justify-center text-center cursor-pointer rounded-lg hover:bg-gray-500 hover:opacity-60 disabled:bg-gray-800 disabled:hover:bg-gray-800 disabled:cursor-default disabled:opacity-40"
                        disabled={disabled}
                        onClick={() => onDateSelected(date.toDate())}
                      >
                        {date.get('date')}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
