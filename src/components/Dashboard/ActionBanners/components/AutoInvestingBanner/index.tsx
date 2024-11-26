import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { ChevronRightIcon } from '@sw-npm-packages/icons'
import { ConfettiImage } from 'assets/images'

const AutoInvestingBanner = () => {
  const t = useTranslations('HomePage')

  // const onClick = () => {
  //   return
  // }

  return (
    <div className="h-[192px] all-sides-shadow rounded-lg p-4 m-1 justify-between overflow-hidden">
      <div className="flex-col justify-between">
        <div className="flex-col">
          <h3 className="text-dark-gray-5E mb-2">{t('getFreeGold')}</h3>
          <SubTitle className="text-dark-gray-5E text-start">
            {t('autoInvesting')}
          </SubTitle>
        </div>
        <div className="items-center">
          <Title className="text-pink mr-1">{t('comingSoon')}</Title>
          <ChevronRightIcon color="var(--pink)" />
        </div>
      </div>
      <div className="absolute right-0 h-[166px] bottom-4 overflow-hidden">
        <Image src={ConfettiImage} alt={t('goldBarImageAlt')} />
      </div>
    </div>
  )
}

export { AutoInvestingBanner }
