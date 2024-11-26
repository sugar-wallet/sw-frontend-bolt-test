import React from 'react'

import { IIcon, commonProps } from './common'

const Info = React.forwardRef(
  (
    { color = 'currentColor', size = 26, ...rest }: IIcon,
    ref: React.LegacyRef<SVGSVGElement>
  ) => {
    return (
      <svg
        {...commonProps}
        viewBox="0 0 24 25"
        ref={ref}
        width={size}
        height={size}
        stroke={color}
        {...rest}
      >
        <path
          d="M12 15.7801V12.5801M12 9.38008H12.008M20 12.5801C20 16.9984 16.4183 20.5801 12 20.5801C7.58172 20.5801 4 16.9984 4 12.5801C4 8.1618 7.58172 4.58008 12 4.58008C16.4183 4.58008 20 8.1618 20 12.5801Z"
          //   stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

Info.displayName = 'Info'

export { Info }
