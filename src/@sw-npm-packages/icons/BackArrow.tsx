import React from 'react'

import { IIcon, commonProps } from './common'

const BackArrow = React.forwardRef(
  (
    { color = 'currentColor', size = 30, ...rest }: IIcon,
    ref: React.LegacyRef<SVGSVGElement>
  ) => {
    return (
      <svg
        {...commonProps}
        ref={ref}
        width={size}
        height={size}
        stroke={color}
        strokeWidth={2.5}
        {...rest}
      >
        <path d="M13.5 26L1.5 14M1.5 14L13.5 2M1.5 14H25.5" />
      </svg>
    )
  }
)

BackArrow.displayName = 'Back Arrow'

export { BackArrow }
