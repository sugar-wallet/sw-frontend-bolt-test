import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { CorrectIcon, PendingIcon } from '@sw-npm-packages/icons'
import { fetchReferralsRetrive, fetchUserReferrals } from 'config'
import { formatMoney } from 'helpers'

const ReferralTrack = () => {
  const { data } = useQuery(fetchReferralsRetrive({ hello: 1 }))
  const t = useTranslations('ReferralPage')
  const ct = useTranslations('Common')

  const { referredUsers, transactingUsers, signedUpUsers, totalReward } =
    data || {}
  return (
    <div className="flex-col w-full mt-8 pb-20">
      <Title className="text-md font-semibold">{t('trackInvites')}</Title>
      <SubTitle className="text-sm mt-1">{t('inviteMorePeople')}</SubTitle>
      <div className="justify-between mt-2">
        <div className="[&>*]:mr-4 font-light text-xs">
          <div>
            {referredUsers?.length || 0} {ct('invited')}
          </div>
          <div>
            {signedUpUsers || 0} {ct('successful')}
          </div>
          <div>
            {transactingUsers || 0} {ct('pending')}
          </div>
        </div>
        <div className="text-sm">
          {formatMoney(Number(totalReward))} {t('earned')}
        </div>
      </div>
      <div className="flex-col mt-4 pt-2">
        {totalReward === 0 ? (
          <div className="mt-2 mb-6"> {t('noInvites')} </div>
        ) : (
          <>
            {referredUsers?.map((user) => (
              <div key={user.first_name} className="mt-4 justify-between">
                <div>
                  {user?.reward_for_referral === 0 ? (
                    <PendingIcon color="#5E5E5E" />
                  ) : (
                    <CorrectIcon color="#5E5E5E" />
                  )}
                  <div className="flex-col ml-4">
                    <div className="text-sm">{user.first_name}</div>
                    {user?.reward_for_referral === 0 ? (
                      <div className="text-xs font-light mt-1">
                        {ct('pending')} {ct('purchase')}
                      </div>
                    ) : (
                      <div className="text-xs text-success-green font-light mt-1">
                        {ct('successful')}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm mt-1">{`+ ${formatMoney(
                  user.reward_for_referral
                )}`}</div>
              </div>
            ))}
            {/* {pendingPurchaseUsers?.userList?.map((user) => (
              <div key={user.id} className="mt-4">
                <div>
                  <PendingIcon color="#5E5E5E" />
                  <div className="flex-col ml-4">
                    <div className="text-sm">{user.name}</div>
                    <div className="text-xs font-light mt-1">
                      {ct('pending')} {ct('purchase')}
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
          </>
        )}
      </div>
    </div>
  )
}

export { ReferralTrack }
