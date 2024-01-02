'use client'

import IntervalItem, { Interval } from '@/components/intervalItem'
import { MultiStep } from '@/components/multiStep'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana.',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) => interval.endTimeInMinutes > interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término para os agendamentos deve ocorrer após o horário de início.',
      },
    ),
  appointmentTime: z
    .string()
    .transform((appointmentTime) => convertTimeStringToMinutes(appointmentTime))
    .refine((appointmentTime) => appointmentTime > 0, {
      message: 'O tempo de duração da consulta deve ser maior que 0 minutos.',
    }),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

const Register = () => {
  const form = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
      appointmentTime: '00:30',
    },
  })

  const router = useRouter()

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control: form.control,
    name: 'intervals',
  })

  const intervals = form.watch('intervals')

  const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>([])

  const handleIntervalChange = (intervals: Interval[]) => {
    setSelectedIntervals(intervals)
  }

  const [showIntervalForms, setShowIntervalForms] = useState<boolean[]>(
    Array(7).fill(false),
  )

  const [showButtons, setShowButtons] = useState<boolean[]>(Array(7).fill(true))

  const toggleIntervalForm = (dayIndex: number) => {
    const updatedVisibility = [...showIntervalForms]
    updatedVisibility[dayIndex] = !updatedVisibility[dayIndex]
    setShowIntervalForms(updatedVisibility)

    const updatedButtons = [...showButtons]
    updatedButtons[dayIndex] = !updatedButtons[dayIndex]
    setShowButtons(updatedButtons)
  }

  const getDayOfWeek = (dayIndex: number): string => {
    const daysOfWeek = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ]
    return daysOfWeek[dayIndex]
  }

  /*
    Can`t use 'data: TimeIntervalsFormOutput' because of an error in Typescript
    after an actualization of Zod or ReactHookForm
  */
  async function handleSetTimeIntervals(data: unknown) {
    // setSelectedIntervals(data.intervals)
    // console.log('Intervals from IntervalForm:', data.intervals)

    const { intervals, appointmentTime } = data as TimeIntervalsFormOutput
    await api.post('/users/time-intervals', { intervals, appointmentTime })
    router.push('/register/pricing')
  }

  return (
    <main className="max-w-[572px] mt-20 mb-20 mx-auto py-0 px-4">
      <div className="py-0 px-6">
        <strong className="text-2xl text-white">
          Já está quase terminando!
        </strong>
        <p className="mb-6">
          Defina agora os horários que você tem disponível para realizar os seus
          atendimentos.
        </p>

        <MultiStep size={4} currentStep={3} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSetTimeIntervals)}
          className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6 gap-4 text-white"
        >
          <div className="border border-solid border-gray-600 rounded-md mb-4">
            {fields.map((field, index) => {
              return (
                <div key={index}>
                  <div
                    key={field.id}
                    className="flex items-center justify-between py-3 px-4"
                  >
                    <div className="flex items-center gap-3">
                      <Controller
                        name={`intervals.${index}.enabled`}
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <Checkbox
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                              checked={field.value}
                            />
                          )
                        }}
                      />
                      <p className="text-sm">{weekDays[field.weekDay]}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        step={60}
                        disabled={intervals[index].enabled === false}
                        {...form.register(`intervals.${index}.startTime`)}
                      />

                      <Input
                        type="time"
                        step={60}
                        disabled={intervals[index].enabled === false}
                        {...form.register(`intervals.${index}.endTime`)}
                      />

                      <Button
                        type="button"
                        variant={showButtons[index] ? undefined : 'destructive'}
                        onClick={() => toggleIntervalForm(index)}
                      >
                        <Plus className="w-[10px] h-[10px]" />
                        <p className="text-xs">Intervalo</p>
                      </Button>
                    </div>
                  </div>

                  {showIntervalForms[index] && (
                    <IntervalItem
                      dayOfWeek={getDayOfWeek(index)}
                      onChange={handleIntervalChange}
                    />
                  )}
                  {index < fields.length - 1 && (
                    <div className="h-[1px] bg-gray-600" />
                  )}
                </div>
              )
            })}
          </div>

          {form.formState.errors.intervals && (
            <p className="text-sm text-[#F75A68] mb-4">
              {form.formState.errors.intervals.message}
            </p>
          )}

          <div className="flex items-center justify-center border border-solid border-gray-600 gap-5 py-4 px-6 rounded-md mb-4">
            <p className="text-sm">Tempo de duração da consulta</p>
            <Input
              className="w-100"
              type="time"
              step={60}
              {...form.register('appointmentTime')}
            />
          </div>

          {/* <div className="flex items-center justify-between border border-solid border-gray-600 py-4 px-6 rounded-md mb-4">
            <p className="text-sm">Possui intervalos ao longo do dia?</p>
            <Button variant="outline">Personalizar horários</Button>
          </div> */}

          <Button>
            Próximo Passo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default Register
