import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Title } from '@sw-npm-packages/components'
import SliderOneImage from 'assets/images/Slider1.png'
import { ImageComponent as Image } from 'components'

const SliderOne: React.FC<React.HTMLProps<HTMLButtonElement>> = () => {
  const t = useTranslations('OnboardingPage')
  const router = useRouter()
  const { referralCode, campaignCode } = router.query
  const isReferralCodeUsed = referralCode || campaignCode
  return (
    <div className="flex-col w-full items-center mb-24">
      <h1>
        {t.rich('buyGold', {
          span: (content) => <span className="text-gold">{content}</span>
        })}
      </h1>
      <div className="slider-image-container w-full min-h-[30vh]">
        <Image
          src={SliderOneImage}
          alt="Slider image"
          style={{ height: '30vh', width: 'auto' }}
        />
      </div>
      <div className="flex-col items-center">
        <h2>{isReferralCodeUsed ? 'Hi, we’re Sugar Wallet' : t('from$1')}</h2>
        {isReferralCodeUsed ? (
          <Title className="flex-col flex-center mt-2 max-xs:mt-2 [&>div]:mb-2">
            <div>Save in digital gold. From ₹50.</div>
            <div>Withdraw anytime.</div>
            <div>24k Purity</div>
          </Title>
        ) : (
          <>
            <Title className="block text-xl mt-6 max-xs:mt-2">
              {t('99Purity')}
            </Title>

            <Title className="text-xl">{t('withdrawAnytime')}</Title>
          </>
        )}
      </div>
    </div>
  )
}

export default SliderOne
