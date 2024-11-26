import React from 'react'

import { IIcon, commonProps } from './common'

const Pending = React.forwardRef(
  (
    { color = 'currentColor', size = 40, ...rest }: IIcon,
    ref: React.LegacyRef<SVGSVGElement>
  ) => {
    return (
      <svg
        {...commonProps}
        viewBox="0 0 40 41"
        ref={ref}
        width={size}
        height={size}
        stroke={color}
        {...rest}
      >
        <g clip-path="url(#clip0_2190_15091)">
          <circle cx="20" cy="20.1836" r="20" fill={color} />
          <g clip-path="url(#clip1_2190_15091)">
            <path
              d="M7.9701 20.1836C7.9701 13.28 13.5665 7.68359 20.4701 7.68359C27.3737 7.68359 32.9701 13.28 32.9701 20.1836C32.9701 27.0872 27.3737 32.6836 20.4701 32.6836C15.8004 32.6836 11.7287 30.123 9.58267 26.3292M7.9701 20.1836L12.9449 16.4069M7.9701 20.1836L4.52985 15.2849M20.4701 14.0725V21.5725L25.4701 24.0725"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_2190_15091">
            <rect
              y="0.183594"
              width={size}
              height={size}
              rx={Number(size) / 2}
              fill="white"
            />
          </clipPath>
          <clipPath id="clip1_2190_15091">
            <rect
              width={0.75 * Number(size)}
              height={0.75 * Number(size)}
              fill="white"
              transform="translate(3.75 5.18359)"
            />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

Pending.displayName = 'Pending'

export { Pending }
