import { useTranslations } from 'next-intl'
import React from 'react'

import SliderThreeImage from 'assets/images/Slider3.png'
import { ImageComponent } from 'components'

const SliderThree = () => {
  const t = useTranslations('OnboardingPage')
  return (
    <div className="flex-col items-center mb-24">
      <h2 className="w-[80%]">{t('protectAgainstInflation')}</h2>

      <div className="slider-image-container mt-8 w-full max-w-[360px] min-h-[30vh] flex-center">
        <ImageComponent
          src={SliderThreeImage}
          alt={t('sliderImageAlt')}
          style={{
            height: '30vh',
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>

      <h3 className="mt-4 w-[80%]">{t('goldPriceWentUp')}</h3>
    </div>
  )
}

export default SliderThree
