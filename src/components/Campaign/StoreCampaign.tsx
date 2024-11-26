import { useTranslations } from 'next-intl'
import React from 'react'

import { DoubleGoldBarImage, LogoImage } from 'assets/images'
import { ImageComponent } from 'components'

const StoreCampaign = () => {
  const t = useTranslations('CampaignPage')
  const ct = useTranslations('Common')

  return (
    <div className="px-4 flex-col">
      <div className="justify-center items-center my-10">
        <div className="w-20">
          <LogoImage />
        </div>
      </div>
      <div className="text-3xl text-white font-medium mt-[6vh] w-full justify-center">
        {t('storeCampaignWin')}
      </div>
      <div className="justify-center mb-6 mt-2 text-5xl font-bold font-octarine flex-wrap">
        <div className="gold-text min-w-fit">{ct('24kGold')}</div>
      </div>
      <div className="w-full justify-center items-center">
        <ImageComponent
          src={DoubleGoldBarImage}
          alt="Gold Bar"
          style={{ width: 'calc(30% + 25vh)' }}
        />
      </div>
      <div className="text-xxl font-medium mt-[3vh] w-full justify-center">
        {t('storeCampaignWinQuestion')}
      </div>
    </div>
  )
}

export { StoreCampaign }
