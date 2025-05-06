import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gradient'
  size?: 'default' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-gradient-to-r from-purple-500 to-teal-400 text-white hover:opacity-90': variant === 'gradient',
              'bg-white text-gray-900 hover:bg-gray-100': variant === 'default',
              'h-10 px-4 py-2': size === 'default',
              'h-12 px-8 py-3 text-lg': size === 'lg',
            },
            className
          )
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
