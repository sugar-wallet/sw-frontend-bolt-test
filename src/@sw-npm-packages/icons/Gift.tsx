import React from 'react'

import { IIcon, commonProps } from './common'

const Gift = React.forwardRef(
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
        strokeWidth={1.5}
        {...rest}
      >
        <path d="M24.2 16.0889V25.0889H9.8V16.0889M17 25.0889V11.5889M17 11.5889H12.95C12.3533 11.5889 11.781 11.3518 11.359 10.9299C10.9371 10.5079 10.7 9.9356 10.7 9.33887C10.7 8.74213 10.9371 8.16983 11.359 7.74788C11.781 7.32592 12.3533 7.08887 12.95 7.08887C16.1 7.08887 17 11.5889 17 11.5889ZM17 11.5889H21.05C21.6467 11.5889 22.219 11.3518 22.641 10.9299C23.0629 10.5079 23.3 9.9356 23.3 9.33887C23.3 8.74213 23.0629 8.16983 22.641 7.74788C22.219 7.32592 21.6467 7.08887 21.05 7.08887C17.9 7.08887 17 11.5889 17 11.5889ZM8 11.5889H26V16.0889H8V11.5889Z" />
      </svg>
    )
  }
)

Gift.displayName = 'Gift'

export { Gift }
