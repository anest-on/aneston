/* eslint-disable prettier/prettier */
import { api } from '@/lib/axios'
import stringDateToNumber from '@/utils/date-string-to-number'
import getHourFromMinutes from '@/utils/get-hour-from-minutes'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  Calendar,
  dayTimeIntervalProps,
  userTimeIntervalsGetResponse
} from '../calendar'

interface CalendarStepProps {
  onSelectDateTime?: (date: Date) => void
  isScheduleConfirmed?: boolean
}

interface weekDayProps {
  name: string
  intervals: dayTimeIntervalProps[]
}

const CalendarIntermediary = ({
  onSelectDateTime,
  isScheduleConfirmed,
}: CalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [intervals, setIntervals] = useState<userTimeIntervalsGetResponse[]>([])
  const [weekDay, setWeekDay] = useState('')
  const [availability, setAvailability] = useState<number[]>([])

  useMemo(async () => {
    const request = await api.get('https://aneston.vercel.app/time-intervals')
    console.log(request.data)
    request &&
      setIntervals(() => request.data as userTimeIntervalsGetResponse[])
  }, [])

  useEffect(() => {
    const dayOfWeek = dayjs(selectedDate).locale(ptBr).format('dddd')
    setWeekDay(() =>
      selectedDate ? dayOfWeek : '',
    )

    const numberDayOfWeek = stringDateToNumber(dayOfWeek)

    const dayInterval = intervals.find((i) => {
      return i.week_day === numberDayOfWeek && i
    })

    const data: number[] = []
    if (dayInterval)
      for (
        let i = dayInterval.time_start_in_minutes;
        i < dayInterval?.time_end_in_minutes;
        i = i + dayInterval?.appointment_time
      ) {
        dayInterval.day_time_intervals.length !== 0 ? dayInterval.day_time_intervals.forEach((e) => {
          !(i >= e.time_start_in_minutes && i <= e.time_end_in_minutes) &&
            data.push(i)
        }) : data.push(i)

      }

    setAvailability(() => data)
  }, [selectedDate])


  function handleSelectTime(value: number) {
    // const dateWithTime = dayjs(selectedDate)
    //   .locale(ptBr)
    //   .set('hour', hour)
    //   .set('minute', Math.round((hour - Math.floor(hour)) * 60))
    //   .set('second', 0)
    //   .toDate()
    console.log(value)
    // onSelectDateTime && onSelectDateTime(dateWithTime)
  }

  return (
    <div className="flex flex-row items-center">
      <Calendar selectedDate={intervals} onDateSelected={setSelectedDate} />

      {!!selectedDate && (
        <div className="flex flex-col border-l-[1px] bg-gray-900 border-l-gray-600 pt-6 pl-6 pb-0 pr-6 justify-center max-h-[300px] rounded-r-lg top-0 bottom-0 right-0 min-w-[280px]">
          <div className="flex items-center justify-between">
            <p className="font-medium text-white">
              {dayjs(selectedDate).locale(ptBr).format('DD[ de ] MMMM')}{' '}
              <span className="text-gray-200">{weekDay}</span>
            </p>
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="border-0 cursor-pointer text-gray-100 rounded-sm text-sm items-center pt-1 mr-4"
            >
              <X size="19" />
            </button>
          </div>

          <div className='flex flex-col mt-5 h-full overflow-y-scroll px-2'>
            {availability.length !== 0 &&
              availability.map((item) => {
                return (<button
                  className=" mb-1 text-white bg-gray-600 item-center justify-center text-center cursor-pointer rounded-lg hover:bg-gray-500 hover:opacity-60 disabled:bg-gray-800 disabled:hover:bg-gray-800 disabled:cursor-default disabled:opacity-40"
                  onClick={() => handleSelectTime(item)}
                  key={item}
                >
                  {getHourFromMinutes(item)[0]}h:{getHourFromMinutes(item)[1]}
                </button>)
              })
            }
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2"></div>
        </div>
      )
      }
    </div >
  )
}

export default CalendarIntermediary
