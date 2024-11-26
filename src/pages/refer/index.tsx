import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { CustomModal, ReferralCard, ReferralTrack } from 'components'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { getCountryCode } from '@sw-npm-packages/config'

const Refer = () => {
  const [isCopied, setCopied] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const t = useTranslations('ReferralPage')
  const countryCode = getCountryCode()
  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('title')}>
        <div className="flex-col w-full">
          {countryCode === 'IN' ? (
            <>
              <h2>{t('invitePeople')},</h2>
              <h2>{t('inviteEarning')}.</h2>
            </>
          ) : (
            <h2>
              Invite friends & get upto{' '}
              <span style={{ color: '#FD889A' }}>$10,000</span> a year{' '}
            </h2>
          )}
          {/* <ReferralLeaderboard /> */}
          <div className="flex-col mt-4 w-full">
            <ReferralCard
              openModal={() => setModalOpen(true)}
              isCopied={isCopied}
              setCopied={setCopied}
            />
            <ReferralTrack />
          </div>
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default Refer
