import React from 'react'

import { IIcon, commonProps } from './common'

const Correct = React.forwardRef(
  (
    { color = 'currentColor', size = 40, ...rest }: IIcon,
    ref: React.LegacyRef<SVGSVGElement>
  ) => {
    return (
      <svg
        {...commonProps}
        viewBox="0 0 40 42"
        ref={ref}
        width={size}
        height={size}
        stroke={color}
        {...rest}
      >
        <g>
          <circle cx="19.9998" cy="20.1836" r="19" fill={color} />
          <path
            d="M28.8886 14.0723L16.6664 26.2945L11.1108 20.7389"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2190_15101">
            <rect fill="white" transform="translate(0 0.183594)" />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

Correct.displayName = 'Correct'

export { Correct }
