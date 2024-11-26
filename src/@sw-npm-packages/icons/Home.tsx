import React from 'react'

import { IIcon, commonProps } from './common'

const Home = React.forwardRef(
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
        <path d="M13.5193 26.1656V16.6656H19.2193V26.1656M7.81934 13.8156L16.3693 7.16565L24.9193 13.8156V24.2656C24.9193 24.7696 24.7192 25.2528 24.3628 25.6092C24.0065 25.9655 23.5232 26.1656 23.0193 26.1656H9.71934C9.21542 26.1656 8.73215 25.9655 8.37583 25.6092C8.01951 25.2528 7.81934 24.7696 7.81934 24.2656V13.8156Z" />
      </svg>
    )
  }
)

Home.displayName = 'Home'

export { Home }
