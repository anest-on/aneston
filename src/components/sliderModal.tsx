'use client'

import { useEffect, useState } from 'react'
import ScheduleSelector from './timeScheduler/timeSchedulerModal'
import { Button } from './ui/button'

interface Ischedule {
  schedule: Array<Date>
}

interface IsliderModal {
  display: 'hidden' | 'fixed'
}

export default function SliderModal({ display = 'hidden' }: IsliderModal) {
  const [state, setState] = useState<Ischedule>({ schedule: [] })
  const [displayValue, setDisplayValue] = useState({
    display,
  })

  const handleChange = (newSchedule: Array<Date>) => {
    setState(() => {
      return {
        schedule: newSchedule,
      }
    })
  }
  if (displayValue.display === 'fixed')
    return (
      <div
        className={`flex flex-col bg-gray-800 border-solid border-[1px] overflow-auto border-gray-600 w-[500px] h-[600px] rounded-[6px] items-center p-5 fixed z-[100] top-10`}
      >
        <Button
          onClick={() =>
            setDisplayValue(() => {
              return {
                display: 'hidden',
              }
            })
          }
        >
          Close
        </Button>
        <ScheduleSelector
          selection={state.schedule}
          numDays={7}
          minTime={8}
          maxTime={17}
          hourlyChunks={7}
          timeFormat={'HH:mm'}
          onChange={(date: Date[]) => {
            handleChange(date)
          }}
          columnGap={'10px'}
          rowGap={'3px'}
        />
      </div>
    )
  else {
    return null
  }
}
