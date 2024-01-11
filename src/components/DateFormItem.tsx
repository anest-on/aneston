import React, { useState } from 'react'
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const DateFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, children, ...props }, ref) => {
    const [date, setDate] = useState<Date>()
    const [isSelected, setIsSelected] = useState(false)

    return (
      <div
        className={cn(
          'flex flex-col item-start text-white rounded-md bg-gray-600 px-5 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-600',
          className,
          isSelected ? 'border-solid border-[1px] border-green-600' : '',
        )}
      >
        <p className="text-[1.1rem]">
          <b>{children}</b>
        </p>
        {!!prefix && <p className="text-gray-400 ">{prefix}</p>}
        <input
          className="w-[280px] p-2 rounded-md justify-start items-center text-left font-normal mt-7 bg-gray-800 border-gray-900"
          type="date"
          ref={ref}
          onFocus={() => setIsSelected(() => !isSelected)}
          onBlur={() => setIsSelected(() => !isSelected)}
          {...props}
        />
      </div>
    )
  },
)
DateFormItem.displayName = 'FormItem'

export { DateFormItem }
