import React, { useState, ChangeEvent } from 'react'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Input } from './ui/input'

export interface Interval {
  input1: string
  input2: string
}

interface IntervalFormProps {
  dayOfWeek: string
  onChange: (intervals: Interval[]) => void
}

const IntervalForm: React.FC<IntervalFormProps> = ({ dayOfWeek, onChange }) => {
  const [intervals, setIntervals] = useState<Interval[]>([
    { input1: '', input2: '' },
  ])

  const addInterval = () => {
    setIntervals([...intervals, { input1: '', input2: '' }])
  }

  const removeInterval = (index: number) => {
    const updatedIntervals = intervals.filter((_, i) => i !== index)
    setIntervals(updatedIntervals)
  }

  const handleInputChange = (
    index: number,
    inputName: string,
    value: string,
  ) => {
    const updatedIntervals = [...intervals]
    updatedIntervals[index] = {
      ...updatedIntervals[index],
      [inputName]: value,
    }
    setIntervals(updatedIntervals)

    onChange(updatedIntervals)
    console.log('Updated Interval in IntervalItem:', updatedIntervals[index])
  }

  const handleAddClick = () => {
    addInterval()
    onChange(intervals)
  }

  return (
    <div className="px-5">
      {/* {showAddButton && (
        <Button
          onClick={handleAddClick}
          size={'sm'}
          className=" text-white gap-2"
        >
          <Plus className="w-[10px] h-[10px]" /> Intervalo
        </Button>
      )}
      {!showAddButton && (
        <Button
          size={'sm'}
          className="text-white gap-2 mb-2"
          variant={'blocked'}
        >
          <Plus className="w-[10px] h-[10px]" /> Intervalo
        </Button>
      )} */}
      {intervals.map((interval, index) => (
        <div
          key={index}
          className="mb-4 flex items-center justify-between gap-2 border-t-[0.5px] border-gray-700 border-dashed pt-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <p className="text-xs text-white">Intervalo</p>
              <span className="text-xs text-white">{`${index + 1}:`}</span>
            </div>
            <p className="text-xs text-white">Início</p>
            <Input
              type="time"
              step={60}
              value={interval.input1}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, 'input1', e.target.value)
              }
              className="w-100"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-white">Fim</p>

            <Input
              type="time"
              step={60}
              value={interval.input2}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, 'input2', e.target.value)
              }
              className="w-100"
            />
          </div>
          <Button
            size={'sm'}
            variant={'ghost'}
            type="button"
            onClick={() =>
              index === intervals.length - 1
                ? handleAddClick()
                : removeInterval(index)
            }
          >
            {index === intervals.length - 1 ? (
              <Plus className="w-4 h-4 text-green-600" />
            ) : (
              <Trash className="w-4 h-4 text-red-500" />
            )}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default IntervalForm
