import React from 'react'

import { IIcon, commonProps } from './common'

const Account = React.forwardRef(
  (
    { color = 'currentColor', size = 24, ...rest }: IIcon,
    ref: React.LegacyRef<SVGSVGElement>
  ) => {
    return (
      <svg
        {...commonProps}
        viewBox="0 0 19 20"
        ref={ref}
        width={size}
        height={size}
        stroke={color}
        {...rest}
      >
        <path d="M17.4336 18.8869V16.8869C17.4336 15.826 17.0122 14.8086 16.262 14.0585C15.5119 13.3083 14.4945 12.8869 13.4336 12.8869H5.43359C4.37273 12.8869 3.35531 13.3083 2.60517 14.0585C1.85502 14.8086 1.43359 15.826 1.43359 16.8869V18.8869M13.4336 4.8869C13.4336 7.09604 11.6427 8.8869 9.43359 8.8869C7.22445 8.8869 5.43359 7.09604 5.43359 4.8869C5.43359 2.67776 7.22445 0.886902 9.43359 0.886902C11.6427 0.886902 13.4336 2.67776 13.4336 4.8869Z" />
      </svg>
    )
  }
)

Account.displayName = 'Account'

export { Account }
