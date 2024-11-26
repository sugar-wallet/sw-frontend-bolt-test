import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { CreditCardImage } from 'assets/images'
import { ImageComponent as Image } from 'components'

const SliderOne = () => {
  const t = useTranslations('AutoInvestPage')

  return (
    <div className="flex-col items-center mb-24">
      <h3>{t('howMuchToInvest')}</h3>
      <div className="slider-image-container min-h-[27vh] mt-8">
        <Image
          src={CreditCardImage}
          alt="credit-card-image"
          className="w-full"
        />
      </div>
      <div className="flex-col items-center mt-6">
        <Title className="text-2xl font-medium">{t('setAndForget')}</Title>
        <Title className="text-2xl font-medium">{t('cancelAnytime')}</Title>
        <SubTitle className="text-base mt-4 mx-4">{t('setAnAmount')}</SubTitle>
      </div>
    </div>
  )
}

export { SliderOne }
