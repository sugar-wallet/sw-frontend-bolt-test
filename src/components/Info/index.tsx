import React, { PropsWithChildren } from 'react'

import { AlertIcon } from '@sw-npm-packages/icons'

interface IProps {
  alert?: boolean
  className?: string
}

const Info: React.FC<PropsWithChildren<IProps>> = ({
  children,
  className,
  alert
}) => {
  return alert ? (
    <div className={`flex-row bg-azure p-4 text-sm rounded-md ${className}`}>
      <AlertIcon color="var(--black)" />
      {children}
    </div>
  ) : (
    <div
      className={`flex-col text-center bg-azure p-4 text-sm rounded-md ${className}`}
    >
      {children}
    </div>
  )
}

export { Info }
