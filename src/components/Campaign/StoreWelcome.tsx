import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { GoldCoinsImage, LogoImage } from 'assets/images'
import { ImageComponent } from 'components'
import { emitTrackEvent } from 'helpers/events'

const StoreWelcome = () => {
  const t = useTranslations('CampaignPage')

  useEffect(() => {
    emitTrackEvent(PosthogEvents.StoreWelcomePageViewed)
  }, [])

  return (
    <div className="px-4 flex-col">
      <div className="justify-center items-center my-10">
        <div className="w-20">
          <LogoImage />
        </div>
      </div>
      <div className="text-2xl font-semibold mt-[5vh] w-full justify-center">
        {t('storeWelcomeSignupSuccess')}
      </div>
      <div className="w-full justify-center mt-[5vh] items-center">
        <ImageComponent
          src={GoldCoinsImage}
          alt="Gold Bar"
          style={{ width: 'calc(10% + 30vh)' }}
        />
      </div>
      <div className="justify-center mt-[4vh] mb-[2vh] font-semibold text-2xl flex-wrap">
        {t.rich('storeWelcomeWinMessage', {
          span: (content) => <span className="gold-text mx-2">{content}</span>
        })}
      </div>
      <div className="text-xl w-full justify-center">
        {t('storeWelcomePlay')}
      </div>
    </div>
  )
}

export { StoreWelcome }
