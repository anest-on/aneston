'use client'

import { Calendar } from '@/components/calendar'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { X } from 'lucide-react'
import { useState } from 'react'

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
  isScheduleConfirmed: boolean
}

const CalendarIntermediary = ({
  onSelectDateTime,
  isScheduleConfirmed,
}: CalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ] MMMM')
    : null

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .set('minute', Math.round((hour - Math.floor(hour)) * 60))
      .set('second', 0)
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div isTimePickerOpen={isDateSelected}>
          <Calendar
            selectedDate={selectedDate}
            onDateSelected={setSelectedDate}
          />

          {isDateSelected && (
            <div className="border-l-[1px] bg-gray-800 border-l-gray-600 pt-6 pl-6 pb-0 overflow-y-auto absolute top-0 bottom-0 right-0 w-[280px]">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {weekDay},{' '}
                  <span className="text-gray-200">{describedDate}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="border-0 bg-gray-800 cursor-pointer text-gray-100 rounded-sm text-sm items-center pt-1 mr-4"
                >
                  <X size="19" />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2"></div>
            </div>
          )}
        </div>
      </QueryClientProvider>
    </>
  )
}

export default CalendarIntermediary
