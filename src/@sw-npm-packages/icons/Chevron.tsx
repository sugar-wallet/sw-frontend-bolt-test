import React from 'react'

import { IIcon, commonProps } from './common'

const Chevron = React.forwardRef(
  (
    { color = 'currentColor', size = 25, ...rest }: IIcon,
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    )
  }
)

Chevron.displayName = 'Chevron'

export { Chevron }
