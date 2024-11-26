import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { ChevronRightIcon } from '@sw-npm-packages/icons'
import { MoneyPhoneImage } from 'assets/images'
import { CustomModal } from 'components/CustomModal'
import ReferralInviteCardDetailsNz from 'components/Referral/ReferralInviteCardDetailsNz/ReferralInviteCardDetailsNz'
import { fetchReferralsPredictionRetrive, navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const ReferralBannerNz = () => {
  const { data } = useQuery(fetchReferralsPredictionRetrive())
  const { amount } = data || {}
  const [isModalOpen, setModalOpen] = useState(false)
  const t = useTranslations('HomePage')
  const tc = useTranslations('MyCollectionPage')

  const navigateToReferral = () => {
    navigate(navigationPaths.refer)
  }

  return (
    <div className=" all-sides-shadow rounded-lg p-4 m-1 overflow-hidden relative justify-between">
      <div className="flex-col justify-between">
        <div className="flex-col gap-3">
          <span className="text-base font-medium">
            Earn up to $10,000 a year & get friends up to $10 credit.
          </span>
          <span
            className="text-xs font-normal w-[65%]"
            style={{ color: 'var(--semi-gray)' }}
          >
            Get 25% of our fees on their buy & sell. Friends get $5 for $50 and
            $10 for $100 deposit.
          </span>
          {/* <h3 className="text-dark-gray-5E mb-2 text-lg">{t('getFreeGold')}</h3> */}
          <div className="flex-row items-center gap-2">
            <SubTitle className="text-pink text-xs text-start">
              {/* {t('referralRewards')} */}
              Projected Earnings
            </SubTitle>
            {/* <ContainedButton

          className="bg-black w-[60%] text-sm pt-0 pb-0"
         
        >
         
          Reveal
        </ContainedButton> */}
            {!amount ? (
              <button
                onClick={() => setModalOpen(true)}
                className="text-xs bg-black text-white rounded-full py-2 px-3"
              >
                Reveal
              </button>
            ) : (
              <SubTitle className="text-pink text-xs font-semibold text-start">
                ${amount ?? 0}
              </SubTitle>
            )}
          </div>
        </div>
        <div
          onClick={navigateToReferral}
          className="items-center text-xs rounded-full my-4 self-start"
        >
          <Title className="text-semi-gray text-sm mr-2">
            {/* {tc('learnMore')} */}
            Start now
          </Title>
          <ChevronRightIcon color="var(--semi-gray)" size={12} />
        </div>
      </div>
      <CustomModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <ReferralInviteCardDetailsNz
          onClose={() => setModalOpen(false)}
          navigateToReferral={() => navigateToReferral()}
        />
      </CustomModal>
      <div className="absolute right-0 w-[140px] h-[80px] bottom-4 overflow-hidden">
        <Image
          className="max-w-full max-h-full"
          src={MoneyPhoneImage}
          alt={t('goldBarImageAlt')}
        />
      </div>
    </div>
  )
}

export { ReferralBannerNz }
