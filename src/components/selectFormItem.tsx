/* eslint-disable prettier/prettier */
import React, { useState, ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from './ui/button'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  OptionValues: string[]
  inputValue?: (value: string) => void
}

const SelectFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, children, OptionValues, ...props }, ref) => {
    const [isSelected, setIsSelected] = useState(false)

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
        {!!prefix && <p className="text-gray-400 ">{prefix}</p>}
        <Select onValueChange={(value: ChangeEvent<HTMLInputElement>) => props.onChange && props.onChange(value)} >
          <SelectTrigger
            className="w-[180px] mt-10"
            onFocus={() => setIsSelected(() => !isSelected)}
            onBlur={() => setIsSelected(() => !isSelected)}
          >
            <SelectValue placeholder="Selecione a cirurgia" />
          </SelectTrigger>
          <SelectContent>
            {Array.isArray(OptionValues)
              ? OptionValues.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))
              : <SelectItem value='outro'>
                outro
              </SelectItem>}
          </SelectContent>
        </Select>
      </div >
    )
  },
)
SelectFormItem.displayName = 'FormItem'

export { SelectFormItem }
