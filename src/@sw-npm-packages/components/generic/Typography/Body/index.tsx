import React from 'react'

const Body: React.FC<React.HTMLProps<HTMLSpanElement>> = ({
  className,
  children,
  ...restProps
}) => {
  return (
    <span className={className} {...restProps}>
      {children}
    </span>
  )
}

export { Body }
