/* eslint-disable camelcase */
import { api } from '@/lib/axios'
import { getWeekDays } from '@/utils/get-week-days'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from './ui/button'
import { useSearchParams } from 'next/navigation'
import { queryClient } from '@/lib/react-query'

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

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const searchParams = useSearchParams()

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  // searchParams.get('user_link')
  const user_link = 'matheusadorno'

  // const { data: blockedDates } = useQuery<BlockedDates>(
  //   ['blockedDates', currentDate.get('year'), currentDate.get('month')],
  //   async () => {
  //     const response = await api.get(`/users/${user_link}/blocked-dates`, {
  //       params: {
  //         year: currentDate.get('year'),
  //         month: String(currentDate.get('month') + 1).padStart(2, '0'),
  //       },
  //     })

  //     return response.data
  //   },
  // )

  const calendarWeeks = useMemo(() => {
    // if (!blockedDates) {
    //   return []
    // }

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
          disabled: date.endOf('day').isBefore(new Date()),
          // blockedDates.blockedWeekDays.includes(date.get('day')) ||
          // blockedDates.blockedDates.includes(date.get('date')),
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
  }, [currentDate])

  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <p className="font-medium capitalize text-white">
          {currentMonth} <span className="text-gray-200">{currentYear}</span>
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
                        className="w-[95%] mb-1 aspect-square text-white bg-gray-600 text-center cursor-pointer rounded-lg hover:bg-gray-500 hover:opacity-60 disabled:bg-gray-800 disabled:hover:bg-gray-800 disabled:cursor-default disabled:opacity-40"
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
