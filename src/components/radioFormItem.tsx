/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { FormControl, FormItem, FormLabel } from './ui/form'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  OptionValues: string[]
  inputValue: (value: string) => void
}

const RadioFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, prefix, children, OptionValues, accept, onChange, ...props },
    ref,
  ) => {
    const [isSelected, setIsSelected] = useState(false)
    const [otherInputValue, setOtherInputValue] = useState<ChangeEvent<HTMLInputElement>>()
    const [extraItem, setExtraItem] = useState(false)

    const hadleRadioGroupValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isOnRadioSelect = OptionValues.find((value) => value === String(e))

      if (isOnRadioSelect === accept) setExtraItem(true)

      if (!isOnRadioSelect) setOtherInputValue(e)

      if (onChange)
        if (e && String(e) !== "Outro")
          onChange(e)
        else if (e && otherInputValue && String(e) === "Outro")
          onChange(otherInputValue)
        else
          onChange(e)
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
            onValueChange={(e: ChangeEvent<HTMLInputElement>) => hadleRadioGroupValueChange(e)}
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
                      onChange={hadleRadioGroupValueChange}
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

        {
          (Array.isArray(children) && extraItem) ?
            <div className="bg-gray-800 w-full px-5 py-3 mt-2 rounded-b-md border-dashed border-gray-200 border-b-[2px] border-r-[2px] border-l-[2px]">
              {children.map((item, index) => (
                <span key={index}>{index === 0 ? '' : item}</span>
              ))}
            </div>

            : (
              ''
            )
        }
      </div >
    )
  },
)
RadioFormItem.displayName = 'FormItem'

export { RadioFormItem }
