import React from 'react'

import { PrimaryHeader, SecondaryHeader, TertiaryHeader } from 'components'
import { HeaderVariant } from 'types'

interface IPrimaryLayoutProps {
  title?: string
  headerVariant?: HeaderVariant
  hideBackIcon?: boolean
  hideSupportIcon?: boolean
}

const PrimaryLayout: React.FC<
  React.HTMLProps<HTMLDivElement> & IPrimaryLayoutProps
> = (props) => {
  const {
    title,
    headerVariant = HeaderVariant.PRIMARY,
    hideBackIcon = false,
    hideSupportIcon = false,
    children
  } = props
  return (
    <div className="flex-1 flex-col">
      {headerVariant === HeaderVariant.PRIMARY ? (
        <PrimaryHeader
          title={title}
          hideBackIcon={hideBackIcon}
          hideSupportIcon={hideSupportIcon}
        />
      ) : headerVariant === HeaderVariant.SECONDARY ? (
        <SecondaryHeader />
      ) : headerVariant === HeaderVariant.TERTIARY ? (
        <TertiaryHeader title={title} />
      ) : null}

      <div className="flex-1">{children}</div>
    </div>
  )
}

export { PrimaryLayout }
