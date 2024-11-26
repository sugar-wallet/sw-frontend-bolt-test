import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { fetchUserGifts, fetchUserProfile, navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const WelcomeUser = () => {
  const t = useTranslations('HomePage')
  const { data } = useQuery(fetchUserProfile())
  const { data: giftData, isLoading, isFetching } = useQuery(fetchUserGifts())
  const { total } = giftData || {}

  const onRawardIconClick = () => {
    navigate(navigationPaths.rewards)
  }

  const { firstName } = data || {}

  return (
    <div className="justify-between my-4">
      <h2 className=" font-medium">
        {t('hello')} {firstName}!
      </h2>
      {/*<div className="mt-4 text-dark-gray-5E">
        <div onClick={onRawardIconClick}>
          {isLoading || isFetching ? (
            <Loader />
          ) : (
            <div className="text-sm font-semibold mx-1">
              {formatMoney(total as number)}
            </div>
          )}

          <div className="-mt-2">
            <GiftIcon color="#5E5E5E" size={34} />
          </div>
        </div>
      </div>*/}
    </div>
  )
}

export { WelcomeUser }
