import React from 'react'

import { IIcon, commonProps } from './common'

const ErrorV2 = React.forwardRef(
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
        <path
          d="M15 9.50586L9 15.5059M9 9.50586L15 15.5059M22 12.5059C22 18.0287 17.5228 22.5059 12 22.5059C6.47715 22.5059 2 18.0287 2 12.5059C2 6.98301 6.47715 2.50586 12 2.50586C17.5228 2.50586 22 6.98301 22 12.5059Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

ErrorV2.displayName = 'ErrorV2'

export { ErrorV2 }
