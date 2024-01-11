import React, { useState, ChangeEvent } from 'react'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const TextFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, children, ...props }, ref) => {
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
        <input
          className="font-light w-full py-2 outline-none border-b-[2px] mt-3 border-white bg-gray-600 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
          type={type}
          ref={ref}
          onFocus={() => setIsSelected(() => !isSelected)}
          onBlur={() => setIsSelected(() => !isSelected)}
          {...props}
        />
      </div>
    )
  },
)
TextFormItem.displayName = 'FormItem'

export { TextFormItem }
