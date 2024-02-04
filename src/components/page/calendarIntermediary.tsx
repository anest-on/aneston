'use client'

import { Calendar } from '@/components/calendar'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

const CalendarIntermediary = ({ onSelectDateTime }: CalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

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
        <div>
          <Calendar
            onDateSelected={setSelectedDate}
            selectedDate={new Date()}
          />
        </div>
      </QueryClientProvider>
    </>
  )
}

export default CalendarIntermediary
