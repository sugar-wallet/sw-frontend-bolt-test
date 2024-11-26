import React from 'react'

import { IIcon, commonProps } from './common'

const Buy = React.forwardRef(
  (
    { color = 'currentColor', size = 32, ...rest }: IIcon,
    ref: React.LegacyRef<SVGSVGElement>
  ) => {
    return (
      <svg
        {...commonProps}
        ref={ref}
        width={size}
        height={size}
        stroke={color}
        {...rest}
      >
        <path d="M7.20312 14.7906H25.5365M8.86979 9.16565H23.8698C24.7903 9.16565 25.5365 10.0051 25.5365 11.0406V22.2906C25.5365 23.3262 24.7903 24.1656 23.8698 24.1656H8.86979C7.94932 24.1656 7.20312 23.3262 7.20312 22.2906V11.0406C7.20312 10.0051 7.94932 9.16565 8.86979 9.16565Z" />
      </svg>
    )
  }
)

Buy.displayName = 'Buy'

export { Buy }
