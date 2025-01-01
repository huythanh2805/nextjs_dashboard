import { cn } from '@/lib/utils'
import React, { ButtonHTMLAttributes } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}
const ButtonCustomed: React.FC<Props> = ({children, className, ...rest}) => {
  return (
    <button
      {...rest}
      className={cn(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default ButtonCustomed