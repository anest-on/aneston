/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent, useEffect, use } from 'react'
import { cn } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'
import { CheckedState } from '@radix-ui/react-checkbox'

export interface resposnseCheckboxProps {
  value: string
  checked: boolean
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  OptionValues: string[]
  onChange: (e: string[]) => void
  value: string[]
  inputValue?: (e: boolean) => void
}



const CheckboxFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, children, OptionValues, onChange, inputValue, value, ...props }, ref) => {
    const [isSelected, setIsSelected] = useState(false)
    const [answers, setAnswers] = useState<resposnseCheckboxProps[]>([])

    useEffect(() => {
      if (inputValue)
        value.length === 0 ? inputValue(false) : inputValue(true)

      if (Array.isArray(OptionValues) && answers.length === 0)
        OptionValues.forEach((item) => {
          value.indexOf(item) === -1 ?
            setAnswers(answers => [...answers, { value: item, checked: false }])
            :
            setAnswers(answers => [...answers, { value: item, checked: true }])
        })

    }, [])

    const handleOnChange = () => {
      const stringAnswers: string[] = []
      answers.forEach((element) => {
        if (element.checked === true && stringAnswers.indexOf(element.value) === -1) {
          stringAnswers.push(element.value)
        }
      })
      if (inputValue)
        stringAnswers.length === 0 ?
          inputValue(false) : inputValue(true)
      onChange(stringAnswers)
    }

    const handleCheckedChange = (checked: CheckedState, item: string) => {
      if (checked !== 'indeterminate') {
        setAnswers(answer => {
          const answerValue = answer

          answer.forEach((data, index) => {
            if (data.value === item) {
              answerValue[index] = { value: item, checked }
            }
          })

          return answerValue
        })
        handleOnChange()
      }
    }



    return (
      <div
        className={cn(
          'flex flex-col item-start text-white rounded-md  bg-gray-600  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-600',
          className,
          isSelected ? 'border-solid border-[1px] border-green-600' : '',
        )}
      >
        <div className='px-5 py-4'>
          <p className="text-[1.1rem]">
            <b>{Array.isArray(children) ? children[0] : children}</b>
          </p>
          {!!prefix && <p className="text-gray-400 ">{prefix}</p>}
          <div className="flex flex-col gap-2 mt-5">
            {OptionValues.map((item, index) => (
              <div className="items-center flex space-x-2" key={index}>
                <Checkbox
                  id={cn(item)}
                  onCheckedChange={(checked) => handleCheckedChange(checked, item)}
                  checked={answers.length !== 0 ? answers[index].checked : false}
                  onFocus={() => setIsSelected(() => !isSelected)}
                  onBlur={() => setIsSelected(() => !isSelected)}
                />
                <label
                  htmlFor={cn(item)}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            ))
            }
          </div>
        </div>

      </div>
    )
  },
)
CheckboxFormItem.displayName = 'CheckboxFormItem'

export { CheckboxFormItem }
