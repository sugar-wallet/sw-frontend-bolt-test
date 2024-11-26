import MuiIconButton, { type IconButtonProps } from '@mui/material/IconButton'
import React from 'react'

const IconButton: React.FC<IconButtonProps> = ({ className, ...restProps }) => {
  return (
    <MuiIconButton
      className={`flex justify-center items-center ${className}`}
      disableFocusRipple
      disableRipple
      {...restProps}
    />
  )
}

export { IconButton }
