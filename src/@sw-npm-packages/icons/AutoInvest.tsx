import React from 'react'

import { IIcon, commonProps } from './common'

const AutoInvest = React.forwardRef(
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
        <path d="M19.9695 7.66565V11.2656M12.7695 7.66565V11.2656M8.26953 14.8656H24.4695M10.0695 9.46565H22.6695C23.6636 9.46565 24.4695 10.2715 24.4695 11.2656V23.8656C24.4695 24.8598 23.6636 25.6656 22.6695 25.6656H10.0695C9.07542 25.6656 8.26953 24.8598 8.26953 23.8656V11.2656C8.26953 10.2715 9.07542 9.46565 10.0695 9.46565Z" />
      </svg>
    )
  }
)

AutoInvest.displayName = 'AutoInvest'

export { AutoInvest }
