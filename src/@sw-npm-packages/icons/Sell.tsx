import React from 'react'

import { IIcon, commonProps } from './common'

const Sell = React.forwardRef(
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
        <path d="M8.26953 10.3656V22.9656C8.26953 24.4596 11.8695 25.6656 16.3695 25.6656C20.8695 25.6656 24.4695 24.4596 24.4695 22.9656V10.3656M8.26953 10.3656C8.26953 11.8568 11.896 13.0656 16.3695 13.0656C20.843 13.0656 24.4695 11.8568 24.4695 10.3656M8.26953 10.3656C8.26953 8.87448 11.896 7.66565 16.3695 7.66565C20.843 7.66565 24.4695 8.87448 24.4695 10.3656M24.4695 16.6656C24.4695 18.1596 20.8695 19.3656 16.3695 19.3656C11.8695 19.3656 8.26953 18.1596 8.26953 16.6656" />
      </svg>
    )
  }
)

Sell.displayName = 'Sell'

export { Sell }
