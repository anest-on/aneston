import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full items-center text-white rounded-md border border-gray-900 bg-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-green-600 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        {!!prefix && <p className="text-gray-400 ">{prefix}</p>}
        <input
          className="w-full outline-none border-none bg-gray-900 file:border-0 focus-visible:0 "
          type={type}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
