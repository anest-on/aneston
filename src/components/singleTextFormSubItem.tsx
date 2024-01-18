import React, { useState, ChangeEvent } from 'react'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const SingleTextFormSubItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, children, ...props }, ref) => {
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
          {...props}
        />
      </div>
    )
  },
)
SingleTextFormSubItem.displayName = 'FormItem'

export { SingleTextFormSubItem }
