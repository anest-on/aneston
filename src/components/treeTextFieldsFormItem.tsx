import React, { useState, ChangeEvent } from 'react'

import { Plus, Trash } from 'lucide-react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export interface Interval {
  input1: string
  input2: string
  input3: string
}

const TreeTextFieldsFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, children, defaultValue, ...props }, ref) => {
    const [isSelected, setIsSelected] = useState(false)
    const [intervals, setIntervals] = useState<Interval[]>([
      { input1: '', input2: '', input3: '' },
    ])
    const [errorMessage, setErrorMessage] = useState('')

    const addInterval = () => {
      setIntervals([...intervals, { input1: '', input2: '', input3: '' }])
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
      // console.log('Updated Interval in IntervalItem:', updatedIntervals[index])
    }

    const handleAddClick = (index: number) => {
      if (
        intervals[index].input1 === '' ||
        intervals[index].input2 === '' ||
        intervals[index].input3 === ''
      ) {
        setErrorMessage(
          () =>
            'Você deve preencher todos os campos anteriores antes de adicionar um novo.',
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
          'flex flex-col item-start text-white rounded-md  bg-gray-600 px-5 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-600',
          className,
          isSelected ? 'border-solid border-[1px] border-green-600' : '',
        )}
      >
        <p className="text-[1.1rem]">
          <b>{children}</b>
        </p>
        <p className="text-red-500 ">{errorMessage}</p>
        {intervals.map((interval, index) => (
          <div
            key={index}
            className="mb-4 flex w-full items-end justify-between border-t-[0.5px] border-gray-700 border-dashed "
          >
            <div className="flex w-full items-center gap-2 gap-4">
              <input
                className="font-light w-full py-2 outline-none border-b-[2px] mt-3 border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                step={60}
                value={interval.input1}
                placeholder={Array.isArray(defaultValue) ? defaultValue[0] : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, 'input1', e.target.value)
                }
                {...props}
              />
              <input
                className="font-light w-full py-2 outline-none border-b-[2px] mt-3 border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                step={60}
                value={interval.input2}
                placeholder={Array.isArray(defaultValue) ? defaultValue[1] : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, 'input2', e.target.value)
                }
                {...props}
              />

              <input
                className="font-light w-full py-2 outline-none border-b-[2px] mt-3 border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                step={60}
                value={interval.input3}
                placeholder={Array.isArray(defaultValue) ? defaultValue[2] : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, 'input3', e.target.value)
                }
                {...props}
              />
            </div>
            {index === intervals.length - 1 ? (
              <Button
                size={'sm'}
                variant={'ghost'}
                type="button"
                className="ml-2"
                onClick={() =>
                  index === intervals.length - 1
                    ? handleAddClick(index)
                    : removeInterval(index)
                }
              >
                <Plus className="w-5 h-5 text-green-500" />
              </Button>
            ) : (
              <Button
                size={'sm'}
                variant={'ghost'}
                type="button"
                className="ml-2"
                onClick={() =>
                  index === intervals.length - 1
                    ? handleAddClick(index)
                    : removeInterval(index)
                }
              >
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            )}
          </div>
        ))}
      </div>
    )
  },
)
TreeTextFieldsFormItem.displayName = 'FormItem'

export { TreeTextFieldsFormItem }
