'use client'

import { useEffect, useState } from 'react'

import ScheduleSelector from './timeScheduler/timeSchedulerModal'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Ischedule {
  schedule: Array<Date>
}

interface IsliderModal {
  display: 'hidden' | 'fixed'
}

export default function SliderModal() {
  const [state, setState] = useState<Ischedule>({ schedule: [] })

  const handleChange = (newSchedule: Array<Date>) => {
    setState(() => {
      return {
        schedule: newSchedule,
      }
    })
  }

  return (
    <Dialog className="text-white">
      <DialogTrigger asChild>
        <Button variant={'outline'}>Abrir modal</Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto overflow-x-hidden max-h-[600px] bg-gray-800 no-scrollbar p-10">
        <DialogHeader>
          <DialogTitle className="text-white">
            Configure seus horários
          </DialogTitle>
          <DialogDescription className="text-gray-200">
            Sem problemas, deixe sem seleção os momentos em que você não atenda,
            como durante almoços ou lanches que eles não apareceram como
            disponíveis para os seus pacientes.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
