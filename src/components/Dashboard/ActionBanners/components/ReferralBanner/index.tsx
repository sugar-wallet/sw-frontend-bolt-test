import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { ChevronRightIcon } from '@sw-npm-packages/icons'
import { MoneyPhoneImage } from 'assets/images'
import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const ReferralBanner = () => {
  const t = useTranslations('HomePage')
  const tc = useTranslations('MyCollectionPage')

  const navigateToReferral = () => {
    navigate(navigationPaths.refer)
  }

  return (
    <div
      className=" all-sides-shadow rounded-lg p-4 m-1 overflow-hidden relative justify-between"
      onClick={navigateToReferral}
    >
      <div className="flex-col justify-between">
        <div className="flex-col">
          <h3 className="text-dark-gray-5E mb-2 text-lg">{t('getFreeGold')}</h3>
          <SubTitle className="text-dark-gray-5E text-sm text-start">
            {t('referralRewards')}
          </SubTitle>
        </div>
        <div className="items-center text-xs rounded-full my-4 self-start">
          <Title className="text-semi-gray text-sm mr-2">
            {tc('learnMore')}
          </Title>
          <ChevronRightIcon color="var(--semi-gray)" size={12} />
        </div>
      </div>
      <div className="absolute right-0 w-[140px] h-[80px] bottom-4 overflow-hidden">
        <Image
          className="max-w-full max-h-full"
          src={MoneyPhoneImage}
          alt={t('goldBarImageAlt')}
        />
      </div>
    </div>
  )
}

export { ReferralBanner }
