import React, { ReactElement } from 'react'
import { PulseLoader } from 'react-spinners'
import colors from 'tailwindcss/colors'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loaderColor?: string
  icon?: ReactElement
  iconPosition?: 'left' | 'right'
}

const Button: React.FC<IButton> = (props) => {
  const {
    children,
    className = '',
    isLoading = false,
    loaderColor = colors.white,
    icon,
    iconPosition = 'left',
    ...restProps
  } = props

  return (
    <button
      className={`flex flex-1 btn justify-center items-center ${className}`}
      {...restProps}
    >
      {isLoading ? (
        <div className="inline-block mx-2">
          <PulseLoader color={loaderColor} size={8} />
        </div>
      ) : icon && iconPosition === 'left' ? (
        icon
      ) : null}
      {children}
      {icon && iconPosition === 'right' ? icon : null}
    </button>
  )
}

export { Button }
