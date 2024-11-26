import React from 'react'

import { BackArrowIcon, SupportIcon } from '@sw-npm-packages/icons'
import { LogoImage } from 'assets/images'
import { navigationPaths } from 'config'
import { onSupportClick } from 'helpers'
import { goBack, navigate } from 'helpers/navigation'

interface IPrimaryHeaderProps {
  title?: string
  hideBackIcon?: boolean
  hideSupportIcon?: boolean
}

const PrimaryHeader: React.FC<React.HTMLProps<HTMLDivElement>> = (
  props: IPrimaryHeaderProps
) => {
  const {
    title = 'sugar',
    hideBackIcon = false,
    hideSupportIcon = false
  } = props
  const handleGoBack = () => {
    const { pathname } = window.location

    if ([navigationPaths.taxId].includes(pathname)) {
      // forse refresh
      navigate(navigationPaths.login)
    } else {
      goBack()
    }
  }

  return (
    <div className="justify-center relative items-center -mx-4">
      <div className="bg-black h-36 flex-1 z-0 relative"></div>
      <div className="rounded-t-3xl h-10 bg-white absolute w-full -bottom-1 left-0 z-10"></div>
      <div className="flex-1 top-8 absolute justify-between items-center w-full">
        {hideBackIcon ? (
          <div className="pl-4"></div>
        ) : (
          <div className="pl-4 cursor-pointer" onClick={handleGoBack}>
            <BackArrowIcon color="white" />
          </div>
        )}

        {title && title !== 'sugar' ? (
          <h4 className="font-normal text-white">{title}</h4>
        ) : (
          <div className="w-24">
            <LogoImage />
          </div>
        )}

        {hideSupportIcon ? (
          <div className="pr-4"></div>
        ) : (
          <div className="pr-4 cursor-pointer" onClick={onSupportClick}>
            <SupportIcon size={40} color="var(--white)" />
          </div>
        )}
      </div>
    </div>
  )
}

export { PrimaryHeader }
