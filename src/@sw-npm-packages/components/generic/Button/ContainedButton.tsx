import React from 'react'

import { Button, IButton } from './Button'

const ContainedButton: React.FC<IButton> = ({
  children,
  className = 'btn-contained-pink',
  ...restProps
}) => {
  return (
    <Button className={`${className}`} {...restProps}>
      {children}
    </Button>
  )
}

export { ContainedButton }
