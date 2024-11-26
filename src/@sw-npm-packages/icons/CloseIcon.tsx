import React from 'react'

import { IIcon, commonProps } from './common'

interface IProps extends IIcon {
  onClick: () => void
  className: string
}

const CloseIcon = React.forwardRef(
  (
    { color = 'currentColor', size = 24, className, onClick, ...rest }: IProps,
    ref: React.LegacyRef<SVGSVGElement>
  ) => {
    return (
      <div
        onClick={onClick}
        className={`w-10 h-10 flex items-center justify-center ${className}`}
      >
        <svg
          {...commonProps}
          viewBox="0 0 24 24"
          ref={ref}
          width={size}
          height={size}
          stroke={color}
          {...rest}
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    )
  }
)

CloseIcon.displayName = 'Close Icon'

export { CloseIcon }
