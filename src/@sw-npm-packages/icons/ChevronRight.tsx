import React from 'react'

import { IIcon, commonProps } from './common'

const ChevronRight = React.forwardRef(
  (
    { color = 'currentColor', size = 16, ...rest }: IIcon,
    ref: React.LegacyRef<SVGSVGElement>
  ) => {
    return (
      <svg
        {...commonProps}
        viewBox="0 0 6 12"
        strokeWidth="1.25"
        ref={ref}
        width={size}
        height={size}
        stroke={color}
        {...rest}
      >
        <path d="M0.931641 1.31714L5.06942 5.95047L0.93164 10.5838" />
      </svg>
    )
  }
)

ChevronRight.displayName = 'ChevronRight'

export { ChevronRight }
