/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { FormControl, FormItem, FormLabel } from './ui/form'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  OptionValues: string[]
  onChange: (value: string) => void
  value?: string
  inputValue?: (value: boolean) => void
}

const RadioFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, prefix, children, OptionValues, accept, onChange, inputValue, ...props },
    ref,
  ) => {
    const [isSelected, setIsSelected] = useState(false)
    const [otherInputValue, setOtherInputValue] = useState<string>()
    const [otherStringInputValue, setOtherStringInputValue] = useState<string | null>(null)

    useEffect(() => {
      if (props.value) {
        const isOnRadioSelect = OptionValues.find((value) => value === props.value)

        if (!isOnRadioSelect && typeof props.value === 'string') setOtherStringInputValue(props.value)

        if (isOnRadioSelect === accept) {
          isOnRadioSelect && (inputValue && inputValue(isOnRadioSelect === accept))
        }
      }

    }, [])

    const hadleRadioGroupValueChange = (e: string) => {
      const isOnRadioSelect = OptionValues.find((value) => value === String(e))

      // console.log(e.target.value)

      if (!isOnRadioSelect) {
        setOtherInputValue(e)
        // setOtherStringInputValue(String(e))
      }



      if (onChange)
        if (e && String(e) !== "Outro") {
          onChange(e)
          inputValue && inputValue(String(e) === accept)
        } else if (e && otherInputValue && String(e) === "Outro") {
          onChange(otherInputValue)
          inputValue && inputValue(String(otherInputValue) === accept)
        } else {
          onChange(e)
          inputValue && inputValue(String(e) === accept)
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
            onValueChange={(value) => hadleRadioGroupValueChange(value)}
            className="mt-5"
            onFocus={() => setIsSelected(() => !isSelected)}
            onBlur={() => setIsSelected(() => !isSelected)}
            ref={ref}
          >
            {Array.isArray(OptionValues)
              ? OptionValues.map((item, index) =>
                item === 'Outro' ? (
                  <FormItem className="flex space-x-2 justify-start items-center" key={index}>
                    <FormControl>
                      <RadioGroupItem value="Outro" id={`${Array.isArray(children) ? children[0] : children} ${index}`} />
                    </FormControl>
                    <FormLabel htmlFor={`${Array.isArray(children) ? children[0] : children} ${index}`}>{item}:</FormLabel>
                    <input
                      className="font-light w-full outline-none border-b-[2px] border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      // value={otherStringInputValue}
                      defaultValue={otherStringInputValue || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => hadleRadioGroupValueChange(String(e))}
                    />

                  </FormItem>
                ) : (
                  <FormItem className="flex space-x-2 justify-start items-center" key={index}>
                    <FormControl>
                      <RadioGroupItem value={`${item}`} id={`${Array.isArray(children) ? children[0] : children} ${index}`} />
                    </FormControl>
                    <FormLabel htmlFor={`${Array.isArray(children) ? children[0] : children} ${index}`}>{item}</FormLabel>
                  </FormItem>
                ),
              )
              : ''}
          </RadioGroup>


        </div>
      </div >
    )
  },
)
RadioFormItem.displayName = 'FormItem'

export { RadioFormItem }
