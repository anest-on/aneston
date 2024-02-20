import React, { useState, ChangeEvent } from 'react'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export interface DoubleTextInputProps {
  [input: string]: string
}

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'defaultValue'
  > {
  OptionValues: DoubleTextInputProps
  defaultValue: DoubleTextInputProps[]
  defaultValueProps: { input1: string; input2: string }
  onChange: (value: DoubleTextInputProps[]) => void
}

const DoubleTextListFormSubItem = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className,
      type,
      prefix,
      children,
      defaultValue,
      OptionValues,
      onChange,
      defaultValueProps,
      ...props
    },
    ref,
  ) => {
    const [intervals, setIntervals] =
      useState<DoubleTextInputProps[]>(defaultValue)
    const [errorMessage, setErrorMessage] = useState('')

    const addInterval = () => {
      setIntervals([
        ...intervals,
        { [defaultValueProps.input1]: '', [defaultValueProps.input2]: '' },
      ])
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
      // console.log(updatedIntervals)
      setIntervals(updatedIntervals)
      onChange(updatedIntervals)

      // onChange(updatedIntervals)
      // console.log('Updated Interval in IntervalItem:', updatedIntervals[index])
    }

    const handleAddClick = (index: number) => {
      const {
        [defaultValueProps.input1]: value1,
        [defaultValueProps.input2]: value2,
      } = intervals[index]

      if (value1 === '' || value2 === '') {
        setErrorMessage(
          () =>
            'Você deve preencher todos os campos anteriores antes de adicionar um novo.',
        )
      } else {
        addInterval()
        setErrorMessage(() => '')
      }
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
                value={interval[defaultValueProps.input1]}
                placeholder={OptionValues[defaultValueProps.input1]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(
                    index,
                    defaultValueProps.input1,
                    e.target.value,
                  )
                }
              />

              <input
                className="font-light w-full py-2 outline-none border-b-[2px] mt-3 border-white bg-gray-800 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                step={60}
                value={interval[defaultValueProps.input2]}
                placeholder={OptionValues[defaultValueProps.input2]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(
                    index,
                    defaultValueProps.input2,
                    e.target.value,
                  )
                }
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
DoubleTextListFormSubItem.displayName = 'doubleTextListSubItem'

export { DoubleTextListFormSubItem }
