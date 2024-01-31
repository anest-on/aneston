/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent } from 'react'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

export interface SubItemCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  OptionValues: string[]
  onChange: (e: string) => void
}

const RadioFormSubItem = React.forwardRef<HTMLInputElement, SubItemCheckboxProps>(
  (
    {
      className,
      type,
      children,
      defaultValue,
      OptionValues,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [isSelected, setIsSelected] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [radioId, setRadioId] = useState(Math.random())

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      console.log(children)
    }

    const hadleRadioGroupValueChange = (value: string) => {
      onChange(value)
    }
    return (
      <div
        className={cn(
          'flex flex-col item-start py-2 text-white text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-600',
          className,
        )}
      >
        <p className="text-[1rem]">{children}</p>
        <RadioGroup
          onValueChange={hadleRadioGroupValueChange}
          defaultValue={`${defaultValue}`}
          className="mt-5"
          onFocus={() => setIsSelected(() => !isSelected)}
          onBlur={() => setIsSelected(() => !isSelected)}
        >
          {OptionValues.map((item, index) =>
            item === 'Outro' ? (
              <div className="flex space-x-2 justify-start" key={index}>
                <RadioGroupItem
                  value={`${inputValue}`}
                  id={`${Array.isArray(children) ? children[0] : children
                    } ${index}`}
                />
                <Label
                  htmlFor={`${Array.isArray(children) ? children[0] : children
                    } ${index}`}
                >
                  {item}:
                </Label>
                <input
                  className="font-light w-full outline-none border-b-[2px] border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
                  type={type}
                  ref={ref}
                  onChange={handleChange}
                  value={inputValue}
                  {...props}
                />
              </div>
            ) : (
              <div className="flex space-x-2" key={index}>
                <RadioGroupItem
                  value={`${item}`}
                  id={`${Array.isArray(children) ? children[0] : children
                    } ${index}`}
                />
                <Label
                  htmlFor={`${Array.isArray(children) ? children[0] : children
                    } ${index}`}
                >
                  {item}
                </Label>
              </div>
            ),
          )}
        </RadioGroup>
      </div>
    )
  },
)
RadioFormSubItem.displayName = 'FormItem'

export { RadioFormSubItem }
