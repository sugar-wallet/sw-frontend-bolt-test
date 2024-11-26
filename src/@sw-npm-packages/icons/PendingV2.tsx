import React from 'react'

import { IIcon, commonProps } from './common'

const PendingV2 = React.forwardRef(
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
        <g>
          <path
            d="M3.37602 12.5059C3.37602 6.98301 7.85317 2.50586 13.376 2.50586C18.8989 2.50586 23.376 6.98301 23.376 12.5059C23.376 18.0287 18.8989 22.5059 13.376 22.5059C9.64024 22.5059 6.38293 20.4574 4.66608 17.4224M3.37602 12.5059L7.35586 9.48454M3.37602 12.5059L0.623818 8.58693M13.376 7.61697V13.617L17.376 15.617"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath>
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0 0.505859)"
            />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

PendingV2.displayName = 'PendingV2'

export { PendingV2 }
