/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue: (value: string) => void
}

const RadioFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, prefix, children, defaultValue, value, accept, inputValue, ...props },
    ref,
  ) => {
    const [isSelected, setIsSelected] = useState(false)
    const [otherInputValue, setOtherInputValue] = useState('')
    const [extraItem, setExtraItem] = useState(false)
    const [radioId, setRadioId] = useState(Math.random())



    const handleChange = (value: string) => {
      if (value !== '') {
        setOtherInputValue(value)
        inputValue(value)
      }
    }

    const hadleRadioGroupValueChange = (value: string) => {

      if (value === accept) {
        setExtraItem(() => true)
      } else {
        if (value !== 'Outro') {
          setOtherInputValue('')
          inputValue(value)
        } else {

          inputValue(otherInputValue)
        }
        setExtraItem(() => false)
      }
    }

    return (
      <div
        className={cn(
          'flex flex-col item-start text-white rounded-md bg-gray-600 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-600',
          className,
          isSelected ? 'border-solid border-[1px] border-green-600' : '',
        )}
      >
        <div className="px-5 py-4">
          <p className="text-[1.1rem]">
            <b>{Array.isArray(children) ? children[0] : children}</b>
          </p>
          {!!prefix && <p className="text-gray-400 ">{prefix}</p>}
          <RadioGroup
            onValueChange={hadleRadioGroupValueChange}
            defaultValue={`${defaultValue}`}
            className="mt-5"
            onFocus={() => setIsSelected(() => !isSelected)}
            onBlur={() => setIsSelected(() => !isSelected)}
          >
            {Array.isArray(value)
              ? value.map((item, index) =>
                item === 'Outro' ? (
                  <div className="flex space-x-2 justify-start" key={index}>
                    <RadioGroupItem value="Outro" id={`${Array.isArray(children) ? children[0] : children} ${index}`} />
                    <Label htmlFor={`${Array.isArray(children) ? children[0] : children} ${index}`}>{item}:</Label>
                    <input
                      className="font-light w-full outline-none border-b-[2px] border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                      type={type}
                      ref={ref}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                      value={otherInputValue}
                      {...props}
                    />
                  </div>
                ) : (
                  <div className="flex space-x-2" key={index}>
                    <RadioGroupItem value={`${item}`} id={`${Array.isArray(children) ? children[0] : children} ${index}`} />
                    <Label htmlFor={`${Array.isArray(children) ? children[0] : children} ${index}`}>{item}</Label>
                  </div>
                ),
              )
              : ''}
          </RadioGroup>
        </div>
        {(Array.isArray(children) && extraItem) ?
          <div className="bg-gray-800 w-full px-5 py-3 mt-2 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]">
            {children.map((item, index) => (
              <span key={index}>{index === 0 ? '' : item}</span>
            ))}
          </div>

          : (
            ''
          )}
      </div>
    )
  },
)
RadioFormItem.displayName = 'FormItem'

export { RadioFormItem }
