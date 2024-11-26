import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import React from 'react'

import { PosthogEvents } from '@constants'
import { ContainedButton, OutlinedButton } from '@sw-npm-packages/components'
import { AutoInvestIcon, BuyIcon } from '@sw-npm-packages/icons'
import { fetchUserProfile, navigationPaths } from 'config'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'

import { COOKIE_KEYS } from '../../../@sw-npm-packages/constants'
import { getUserIdFromJWT } from '../../../@sw-npm-packages/utils'
import { gtmPushEvent } from '../../../helpers'

const ActionButtons = () => {
  const t = useTranslations('HomePage')

  const { data: userData } = useQuery(fetchUserProfile())

  const { phoneNumber, email } = userData || {}

  const onBuyClick = function () {
    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
    const userId = getUserIdFromJWT(token)
    gtmPushEvent('select_item', {
      ecommerce: {
        payment_type: 'one time', // one time / subscription,
        value: undefined,
        currency: 'NZD',
        items: [
          {
            item_id: undefined,
            item_name: 'gold',
            index: 0,
            item_brand: undefined,
            item_category: undefined,
            item_category2: undefined,
            item_category3: undefined,
            item_category4: undefined,
            item_category5: undefined,
            item_variant: undefined,
            price: undefined,
            quantity: undefined,
            currency: 'NZD'
          }
        ]
      },
      user_data: {
        id: userId, // Add the unique User ID here
        phone: phoneNumber,
        email: email,
        address: {
          city: undefined,
          gender: undefined,
          address: undefined,
          state: undefined,
          country: undefined,
          postal_code: undefined,
          first_name: undefined,
          last_name: undefined
        }
      }
    })

    emitTrackEvent(PosthogEvents.MainBuyButtonClicked)
    navigate(navigationPaths.buy)
  }

  const onAutoInvestClick = () => {
    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
    const userId = getUserIdFromJWT(token)
    gtmPushEvent('select_item', {
      ecommerce: {
        payment_type: 'subscription', // one time / subscription,
        value: undefined,
        currency: 'NZD',
        items: [
          {
            item_id: undefined,
            item_name: 'gold subscription',
            index: 0,
            item_brand: undefined,
            item_category: undefined,
            item_category2: undefined,
            item_category3: undefined,
            item_category4: undefined,
            item_category5: undefined,
            item_variant: undefined,
            price: undefined,
            quantity: undefined,
            currency: 'NZD'
          }
        ]
      },
      user_data: {
        id: userId, // Add the unique User ID here
        phone: phoneNumber,
        email: email,
        address: {
          city: undefined,
          gender: undefined,
          address: undefined,
          state: undefined,
          country: undefined,
          postal_code: undefined,
          first_name: undefined,
          last_name: undefined
        }
      }
    })

    emitTrackEvent(PosthogEvents.SubscribeButtonClicked)
    navigate(navigationPaths.invest)
  }

  // const onInviteClick = () => {
  //   navigate(navigationPaths.refer)
  // }

  const buyIconComponent = (
    <div className="mr-2">
      <BuyIcon size={24} />
    </div>
  )

  const autoInvestIconComponent = (
    <div className="mr-2">
      <AutoInvestIcon size={24} />
    </div>
  )

  // const referIconComponent = (
  //   <div className="mr-2">
  //     <GiftIcon size={24} />
  //   </div>
  // )

  return (
    <div className="bg-white justify-between rounded-lg">
      <ContainedButton
        icon={buyIconComponent}
        onClick={onBuyClick}
        className="btn-contained-black mr-1 !font-normal"
      >
        {t('buyGold')}
      </ContainedButton>
      {/* {isGlobalApp ? (
        <OutlinedButton
          icon={referIconComponent}
          onClick={onInviteClick}
          className="ml-1 border-1 border-black !font-normal"
          primaryColor="black"
        >
          {t('inviteFriends')}
        </OutlinedButton>
      ) : ( */}
      <OutlinedButton
        icon={autoInvestIconComponent}
        onClick={onAutoInvestClick}
        className="ml-1 border-1 border-black !font-normal"
        primaryColor="black"
      >
        {t('autoInvest')}
      </OutlinedButton>
      {/* )} */}
    </div>
  )
}

export { ActionButtons }
