import React, { useState, ChangeEvent } from 'react'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue?: (value: string) => void
}

const SingleTextFormSubItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, children, inputValue, ...props }, ref) => {
    const handleClick = (value: string) => {
      inputValue && inputValue(value)
    }

    return (
      <div
        className={cn(
          'flex flex-col item-start py-2 text-white text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-600',
          className,
        )}
      >
        <p className="text-[1rem]">{children}</p>
        <input
          className="font-light mt-2 outline-none border-b-[2px] border-white bg-white bg-opacity-0 file:border-0 focus-visible:0 disabled:cursor-not-allowed disabled:opacity-50"
          type={type}
          ref={ref}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleClick(e.target.value)
          }
          {...props}
        />
      </div>
    )
  },
)
SingleTextFormSubItem.displayName = 'FormItem'

export { SingleTextFormSubItem }
