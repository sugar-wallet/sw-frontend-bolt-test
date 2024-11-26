import React from 'react'

import { IconButton } from '@sw-npm-packages/components'
import { AccountIcon, SupportIcon } from '@sw-npm-packages/icons'
import { LogoImageGray } from 'assets/images'
import { navigationPaths } from 'config'
import { onSupportClick } from 'helpers'
import { navigate } from 'helpers/navigation'

const DashboardHeader = () => {
  const onProfileClick = () => {
    navigate(navigationPaths.profile)
  }

  return (
    <div className="h-[82px] justify-between items-center">
      <IconButton
        className="!w-10 !h-10 !bg-light-gray !rounded-full"
        onClick={onProfileClick}
      >
        <AccountIcon color="var(--white)" />
      </IconButton>
      <div className="mt-2">
        <LogoImageGray />
      </div>
      <IconButton className="!w-10 !h-10 !p-0" onClick={onSupportClick}>
        <SupportIcon size={40} color="var(--light-gray)" />
      </IconButton>
    </div>
  )
}

export { DashboardHeader }
