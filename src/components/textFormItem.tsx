import { cn } from '@/lib/utils'
import { getFormatedCpf } from '@/utils/get-formated-cpf'
import { getFormatedPhoneNumber } from '@/utils/get-formated-phone-number'
import React, { ChangeEvent, useState } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputValue?: (value: string) => void
}

const TextFormItem = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, prefix, type, inputValue, ...props }, ref) => {
    const [isSelected, setIsSelected] = useState(false)

    const [value, setValue] = useState(
      type === 'cpf'
        ? getFormatedCpf(String(props.value) || '')
        : type === 'phone'
          ? getFormatedPhoneNumber(String(props.value) || '')
          : props.value,
    )

    const handleClick = (value: string) => {
      type === 'cpf'
        ? setValue(getFormatedCpf(value))
        : type === 'phone'
          ? setValue(getFormatedPhoneNumber(value))
          : setValue(value)
      inputValue && inputValue(value)
    }

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
          {...props}
          type={type === 'cpf' ? 'text' : type === 'phone' ? 'text' : type}
          ref={ref}
          onVolumeChangeCapture={(e) => console.log(e)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleClick(e.target.value)
          }}
          value={value}
          onFocus={() => setIsSelected(() => !isSelected)}
          onBlur={() => setIsSelected(() => !isSelected)}
        />
      </div>
    )
  },
)
TextFormItem.displayName = 'FormItem'

export { TextFormItem }
