import { useTranslations } from 'next-intl'
import React from 'react'

import { Title } from '@sw-npm-packages/components'
import { getCountryCode } from '@sw-npm-packages/config'
import { PaymentPartnersImage, ShagunEnvelopeImage } from 'assets/images'
import { ImageComponent as Image, ImageComponent } from 'components'

const SliderOneReferral: React.FC<React.HTMLProps<HTMLButtonElement>> = () => {
  const t = useTranslations('OnboardingPage')

  const countryCode = getCountryCode()

  return (
    <div className="flex-col w-full px-4 items-center mb-24">
      <h2>
        {t.rich('buyGold', {
          span: (content) => <span className="text-gold">{content}</span>
        })}
      </h2>
      <div className="slider-image-container w-full -mt-8 mb-6 min-h-[32vh]">
        <Image
          src={ShagunEnvelopeImage}
          alt="Slider image"
          style={{
            height: '30vh',
            width: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="flex-col items-center">
        <h3 className="mb-4">{t('hiWeAreSW')}</h3>

        <Title className="flex-col flex-center mt-2 max-xs:mt-2 [&>div]:mb-2">
          <div>{t('saveInDigitalGold')}</div>
          <div>{t('withdrawAnytime')}</div>
          <div>{t('24kPurity')}</div>
        </Title>
      </div>
      {countryCode === 'IN' ? (
        <div className="mt-8 flex-col w-full items-center">
          <Title>{t('partneredWith')}</Title>
          <ImageComponent
            src={PaymentPartnersImage}
            alt="Payment Partners"
            style={{ width: '80%' }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default SliderOneReferral
