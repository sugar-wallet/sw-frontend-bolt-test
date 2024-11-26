import React from 'react'

import { BottomTabNavigation } from 'components'

interface IProps {
  show?: boolean
}

const BottomNavigationLayout: React.FC<React.PropsWithChildren<IProps>> = ({
  show = true,
  children
}) => {
  return (
    <>
      <div className="flex-1">{children}</div>
      {show && <BottomTabNavigation />}
    </>
  )
}

export { BottomNavigationLayout }
