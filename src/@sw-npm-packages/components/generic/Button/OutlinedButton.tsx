import React from 'react'

import { Button, IButton } from './Button'

interface ButtonProps {
  primaryColor?: string
}

const OutlinedButton: React.FC<IButton & ButtonProps> = ({
  children,
  primaryColor = 'white',
  className = '',
  ...restProps
}) => {
  return (
    <Button
      className={`text-${primaryColor} border-[1.75px] border-${primaryColor} ${className}`}
      {...restProps}
    >
      {children}
    </Button>
  )
}

export { OutlinedButton }
