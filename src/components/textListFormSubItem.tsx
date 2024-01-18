import React, { useState, ChangeEvent } from 'react'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export interface Interval {
  input: string
}

const TextListFormSubItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, children, placeholder, ...props }, ref) => {
    const [intervals, setIntervals] = useState<Interval[]>([{ input: '' }])
    const [errorMessage, setErrorMessage] = useState('')

    const addInterval = () => {
      setIntervals([...intervals, { input: '' }])
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

      // onChange(updatedIntervals)
      console.log('Updated Interval in IntervalItem:', updatedIntervals[index])
    }

    const handleAddClick = (index: number) => {
      if (intervals[index].input === '') {
        setErrorMessage(
          () =>
            'Você deve preencher o campo anterior antes de adicionar um novo.',
        )
      } else {
        addInterval()
        setErrorMessage(() => '')
      }
      // onChange(intervals)
    }

    return (
      <div
        className={cn(
          'flex flex-col item-start py-2 text-white text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-600',
          className,
        )}
      >
        <p className="text-[1rem] ">{children}</p>
        <p className=" text-red-500">{errorMessage}</p>
        {intervals.map((interval, index) => (
          <div
            key={index}
            className="mb-4 flex w-full items-end justify-between border-t-[0.5px] border-gray-700 border-dashed "
          >
            <div className="flex w-full items-center gap-4">
              <input
                className="font-light w-full py-2 outline-none border-b-[2px] mt-3 border-white bg-gray-800 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                step={60}
                value={interval.input}
                placeholder={placeholder ? `${placeholder} ${index + 1}` : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, 'input', e.target.value)
                }
                {...props}
              />
            </div>
            {index === intervals.length - 1 ? (
              <Button
                size={'sm'}
                variant={'outline'}
                type="button"
                className="w-[150px] ml-5"
                onClick={() =>
                  index === intervals.length - 1
                    ? handleAddClick(index)
                    : removeInterval(index)
                }
              >
                Adicionar
              </Button>
            ) : (
              <Button
                size={'sm'}
                variant={'destructiveOutline'}
                type="button"
                className="w-[150px] ml-5"
                onClick={() =>
                  index === intervals.length - 1
                    ? handleAddClick(index)
                    : removeInterval(index)
                }
              >
                Remover
              </Button>
            )}
          </div>
        ))}
      </div>
    )
  },
)
TextListFormSubItem.displayName = 'FormItem'

export { TextListFormSubItem }
