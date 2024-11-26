import React from 'react'

import { IIcon, commonProps } from './common'

const Transactions = React.forwardRef(
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
        <path d="M11.9606 15.6101L7.08301 11.3879M7.08301 11.3879L11.9606 7.16565M7.08301 11.3879H24.6953" />
        <path d="M20.7777 26.1657L25.6553 21.9434M25.6553 21.9434L20.7777 17.7212M25.6553 21.9434H8.04303" />
      </svg>
    )
  }
)

Transactions.displayName = 'Transactions'

export { Transactions }
