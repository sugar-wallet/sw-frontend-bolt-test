import React from 'react'

const Title: React.FC<React.HTMLProps<HTMLSpanElement>> = ({
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

export { Title }
