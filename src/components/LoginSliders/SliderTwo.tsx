import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Title } from '@sw-npm-packages/components'
import google from 'assets/images/google.png'
import kpmg from 'assets/images/kpmg.png'
import microsoft from 'assets/images/microsoft.png'
import SliderTwoImage from 'assets/images/Slider2.png'
import { ImageComponent } from 'components'

const SliderTwo = () => {
  const t = useTranslations('OnboardingPage')

  return (
    <div className="flex-col w-full items-center mb-24">
      <h2>
        {t('over10000')} <br />
        {t('usersGlobally')}
      </h2>

      <div className="slider-image-containern w-full max-w-[360px] min-h-[30vh] flex-center">
        <ImageComponent
          src={SliderTwoImage}
          alt={t('sliderImageAlt')}
          style={{
            height: '30vh',
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
      <div className="flex-col items-center">
        <Title className="text-xl">{t('ourTeamsExp')}</Title>
        <div className={`flex justify-around min-h-[40px] mt-6`}>
          <Image
            src={kpmg}
            alt={t('sliderImageAlt')}
            style={{ height: '40px', width: 'auto', marginTop: 1 }}
          />
          <Image
            src={microsoft}
            alt={t('sliderImageAlt')}
            style={{ height: '40px', width: 'auto', marginTop: 1 }}
          />
          <Image
            src={google}
            alt={t('sliderImageAlt')}
            style={{ height: '40px', width: 'auto', marginTop: 1 }}
          />
        </div>
      </div>
    </div>
  )
}

export default SliderTwo
