import React from 'react'

import { IIcon, commonProps } from './common'

const File = React.forwardRef(
  (
    { color = 'currentColor', size = 25, ...rest }: IIcon,
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
        <path
          d="M13.3998 3.75586H7.0998C6.62241 3.75586 6.16458 3.9455 5.82701 4.28307C5.48945 4.62063 5.2998 5.07847 5.2998 5.55586V19.9559C5.2998 20.4332 5.48945 20.8911 5.82701 21.2287C6.16458 21.5662 6.62241 21.7559 7.0998 21.7559H17.8998C18.3772 21.7559 18.835 21.5662 19.1726 21.2287C19.5102 20.8911 19.6998 20.4332 19.6998 19.9559V10.0559M13.3998 3.75586V10.0559H19.6998M13.3998 3.75586L19.6998 10.0559"
          stroke={color}
          // stroke-width="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

File.displayName = 'File'

export { File }
