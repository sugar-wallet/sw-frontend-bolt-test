import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

import { PosthogEvents } from '@constants'
import { ContainedButton, OutlinedButton } from '@sw-npm-packages/components'
import { GoldTreasureImage, GoldTreasureOpenImage } from 'assets/images'
import { ImageComponent } from 'components'
import { fetchUserProfile, navigationPaths } from 'config'
import { formatMoney } from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'

const StorePlay = () => {
  const [isTreasureOpen, setTreasureOpen] = useState(false)
  const openTreasure = () => setTreasureOpen(true)
  const { data } = useQuery(fetchUserProfile())

  const t = useTranslations('CampaignPage')
  const ct = useTranslations('Common')

  useEffect(() => {
    emitTrackEvent(PosthogEvents.StorePlayPageViewed)
  }, [])

  const { rewardValue, redirectionPage } = data || {}

  const navigateToTransaction = () => {
    if (redirectionPage === 'SUBSCRIPTION') {
      navigate(navigationPaths.invest)
    } else {
      navigate(navigationPaths.buy)
    }
  }

  return (
    <>
      <div className="px-4 flex-col">
        {isTreasureOpen ? (
          <>
            <div className="text-2xxxl font-semibold mt-[16vh] w-full justify-center">
              {ct('congratulations')}
            </div>
          </>
        ) : (
          <>
            <div className="text-2xxl gold-text font-semibold mt-[15vh] w-full justify-center">
              {t('storePlayTitle')}
            </div>
            <div className="text-xl font-normal w-full mb-[5vh] justify-center mt-2">
              {t('storePlaySubtitle')}
            </div>
          </>
        )}

        <div className="w-full justify-center my-[5vh] items-center">
          <ImageComponent
            src={isTreasureOpen ? GoldTreasureOpenImage : GoldTreasureImage}
            alt="Gold Bar"
            style={{ width: 'calc(10% + 30vh)' }}
          />
        </div>
        {isTreasureOpen ? (
          <div className="flex-col justify-center items-center">
            <div className="text-lg">{t('storePlayWon')}</div>
            <div className="text-3xl font-semibold mt-2">
              {t.rich('storePlayWonValue', {
                amount: formatMoney(rewardValue || 0),
                span: (content) => (
                  <span className="gold-text mr-2">{content}</span>
                )
              })}
            </div>
            <div className="text-base font-normal mt-6">
              {t('storePlayClaimOption')}
            </div>
          </div>
        ) : (
          <div className="h-[10vh]"></div>
        )}
      </div>

      <div className="mt-[10vh]">
        {isTreasureOpen ? (
          <ContainedButton
            className="btn-contained-pink"
            onClick={navigateToTransaction}
          >
            {t('storePlayClaim')}
          </ContainedButton>
        ) : (
          <OutlinedButton className="btn-outlined-white" onClick={openTreasure}>
            {t('storePlayOpen')}
          </OutlinedButton>
        )}
      </div>
    </>
  )
}

export { StorePlay }
