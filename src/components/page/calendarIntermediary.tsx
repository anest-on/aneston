'use client'

import { Calendar } from '@/components/calendar'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const CalendarIntermediary = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

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
