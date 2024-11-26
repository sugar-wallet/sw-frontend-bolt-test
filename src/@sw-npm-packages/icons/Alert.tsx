import React from 'react'

import { IIcon, commonProps } from './common'

const Alert = React.forwardRef(
  (
    { color = 'currentColor', size = 24, ...rest }: IIcon,
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
        <path d="M12 8.87852V12.4785M12 16.0785H12.009M21 12.4785C21 17.4491 16.9706 21.4785 12 21.4785C7.02944 21.4785 3 17.4491 3 12.4785C3 7.50795 7.02944 3.47852 12 3.47852C16.9706 3.47852 21 7.50795 21 12.4785Z" />
      </svg>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert }
