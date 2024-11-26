import { useTranslations } from 'next-intl'
import React from 'react'

import { Title } from '@sw-npm-packages/components'
import { getCountryCode } from '@sw-npm-packages/config'
import { DeliveryPartnersImage, GoldTreasureOpenImage } from 'assets/images'
import { ImageComponent } from 'components'

const SliderTwoReferral = () => {
  const t = useTranslations('OnboardingPage')

  const countryCode = getCountryCode()

  return (
    <div className="flex-col w-full px-4 items-center mb-24">
      <h2>
        {t.rich('unlockFreeGold', {
          span: (content) => <span className="text-gold">{content}</span>
        })}
      </h2>

      <div className="slider-image-containern w-full max-w-[360px] min-h-[30vh] flex-center">
        <ImageComponent
          src={GoldTreasureOpenImage}
          alt={t('sliderImageAlt')}
          style={{
            width: '80%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="flex-col items-center">
        <h3 className="mb-4">{t('quickEasyReward')}</h3>

        <Title className="flex-col flex-center mt-2 max-xs:mt-2 [&>div]:mb-2">
          <div>{t('claimYourGoldGift')}</div>
          <div>{t('makeYourFirstTransaction')}</div>
          <div>{t('simple')}</div>
        </Title>
      </div>

      {countryCode === 'IN' ? (
        <div className="mt-8 flex-col w-full items-center">
          <Title>{t('deliveryOfGold')}</Title>
          <ImageComponent
            src={DeliveryPartnersImage}
            alt={t('deliveryOfGold')}
            style={{ width: '80%' }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default SliderTwoReferral
