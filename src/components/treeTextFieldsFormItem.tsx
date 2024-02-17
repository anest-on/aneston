import React, { useState, ChangeEvent } from 'react'

import { Plus, Trash } from 'lucide-react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export interface MedicineProps {
  name: string
  dose: string
  pills: string
}

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'defaultValue'
  > {
  OptionValues: MedicineProps
  defaultValue: MedicineProps[]
  defaultValueProps?: { input1: string; input2: string; input3: string }
  onChange: (value: MedicineProps[]) => void
}

const TreeTextFieldsFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      prefix,
      children,
      onChange,
      OptionValues,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const [isSelected, setIsSelected] = useState(false)
    const [intervals, setIntervals] = useState<MedicineProps[]>(defaultValue)
    const [errorMessage, setErrorMessage] = useState('')

    const addInterval = () => {
      setIntervals([...intervals, { name: '', dose: '', pills: '' }])
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
      // console.log('Updated Interval in IntervalItem:', updatedIntervals[index])
    }

    const handleAddClick = (index: number) => {
      if (
        intervals[index].name === '' ||
        intervals[index].dose === '' ||
        intervals[index].pills === ''
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
                value={interval.name}
                placeholder={OptionValues.name}
                onFocus={() => setIsSelected(() => !isSelected)}
                onBlur={() => setIsSelected(() => !isSelected)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, 'name', e.target.value)
                }
              />
              <input
                className="font-light w-full py-2 outline-none border-b-[2px] mt-3 border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                step={60}
                value={interval.dose}
                placeholder={OptionValues.dose}
                onFocus={() => setIsSelected(() => !isSelected)}
                onBlur={() => setIsSelected(() => !isSelected)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, 'dose', e.target.value)
                }
              />

              <input
                className="font-light w-full py-2 outline-none border-b-[2px] mt-3 border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                step={60}
                value={interval.pills}
                placeholder={OptionValues.pills}
                onFocus={() => setIsSelected(() => !isSelected)}
                onBlur={() => setIsSelected(() => !isSelected)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, 'pills', e.target.value)
                }
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
