import React from 'react'

import { Button } from './Button'

const TextButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <Button className={className} {...restProps}>
      {children}
    </Button>
  )
}

export { TextButton }
