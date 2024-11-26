import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { Title } from '@sw-npm-packages/components'
import { DarkGoldBarImage, LogoImage } from 'assets/images'
import { ImageComponent } from 'components'
import { fetchUserProfile } from 'config'
import { formatMoney } from 'helpers'
import { emitTrackEvent } from 'helpers/events'

const EmployerWelcome = () => {
  const t = useTranslations('CampaignPage')
  const { data } = useQuery(fetchUserProfile())
  const { rewardValue } = data || {}

  useEffect(() => {
    emitTrackEvent(PosthogEvents.EmployerWelcomePageViewed)
  }, [])

  const isDevBill = rewardValue && rewardValue > 500

  return (
    <div className="px-4 flex-col">
      <div className="justify-center items-center my-10">
        <div className="w-20">
          <LogoImage />
        </div>
      </div>
      <div className="justify-center mb-10 text-5xl font-bold font-octarine flex-wrap">
        <div className="gold-text min-w-fit">{t('24kGold')}</div>
        <div className="ml-3 min-w-fit">{t('gift')}</div>
      </div>
      <div className="w-full justify-center items-center">
        <ImageComponent
          src={DarkGoldBarImage}
          alt="Gold Bar"
          style={{ width: '80%' }}
        />
      </div>
      <div className="justify-center mt-[4vh] mb-[2vh] font-semibold text-2xxxl flex-wrap">
        {t.rich('claimYourGoldAmount', {
          amount: formatMoney(Number(rewardValue)),
          divOne: (content) => <div className="min-w-fit">{content}</div>,
          divTwo: (content) => (
            <div className="ml-2 gold-text min-w-fit">{content}</div>
          )
        })}
      </div>
      {isDevBill ? (
        <Title className="my-10 text-center">
          Instantly receive ₹{rewardValue}, on your first purchase of ₹250
        </Title>
      ) : (
        <div className="flex-col">
          <div className="mt-4">
            <div className="text-2xxl font-semibold">1.</div>
            <div className="text-xl mt-1 ml-3 font-normal">
              {t('onFirstPurchase', {
                amount: formatMoney(Number(rewardValue))
              })}
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xxl font-semibold">2.</div>
            <div className="text-xl mt-1 ml-3 font-normal">
              {t('referAFriendToPurchase')}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { EmployerWelcome }
