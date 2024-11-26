import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React from 'react'

import { DiwaliLightsImage, GoldMatkaImage, LogoImage } from 'assets/images'
import { ImageComponent } from 'components'
import { formatMoney } from 'helpers'

const EmployerCampaign = () => {
  const t = useTranslations('CampaignPage')
  const router = useRouter()
  const { rewardAmount = '101' } = router.query

  return (
    <div className="px-4 flex-col items-center">
      <ImageComponent
        src={DiwaliLightsImage}
        className="fixed -top-[10vh] -right-10"
        style={{ width: '200px', height: 'auto' }}
        alt="Lights"
      />
      <div className="justify-center items-center mt-10 mb-4">
        <div className="w-20">
          <LogoImage />
        </div>
      </div>
      <div className="text-4xl text-white w-[80%] font-semibold mt-[2vh] mb-[2vh] text-center justify-center">
        {t.rich('yourGiftAwaits', {
          span: (content) => (
            <span className="text-primary-yellow contents">{content}</span>
          )
        })}
      </div>
      <div className="justify-center items-center h-[38vh] -my-[6vh]">
        <ImageComponent
          src={GoldMatkaImage}
          alt="Gold Bar"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>

      <div className="justify-center text-3xxl mt-4 font-bold font-octarine flex-wrap">
        <div className="text-primary-yellow min-w-fit">{t('24kGold')}</div>
      </div>

      <div className="text-2xxl text-white w-full justify-center">
        {t.rich('worthAmount', {
          amount: formatMoney(Number(rewardAmount)),
          span: (content) => (
            <span className="ml-2 text-primary-yellow">{content}</span>
          )
        })}
      </div>
    </div>
  )
}

export { EmployerCampaign }
