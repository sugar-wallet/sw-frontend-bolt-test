import BottomNavigation from '@mui/material/BottomNavigation'
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React from 'react'

import { PosthogEvents } from '@constants'
import { NextLinkComposed } from 'components'
import {
  bottomNavigationConfig,
  fetchUserProfile,
  privateNavigationPaths
} from 'config'
import { emitTrackEvent } from 'helpers/events'

import { COOKIE_KEYS } from '../../@sw-npm-packages/constants'
import { getUserIdFromJWT } from '../../@sw-npm-packages/utils'
import { gtmPushEvent } from '../../helpers'

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: var(--semi-gray);
  .MuiBottomNavigationAction-label {
    font-family: var(--font-family);
  }
  &.Mui-selected {
    color: var(--dark-gray);
  }
`)

const styles = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'block'
}

const BottomTabNavigation = () => {
  const t = useTranslations('Navbar')
  const { pathname } = useRouter()

  const { data: userData } = useQuery(fetchUserProfile())

  const handleOnClick = (path: string) => {
    if (path === privateNavigationPaths.home) {
      emitTrackEvent(PosthogEvents.HomeMenuClicked)
    } else if (path === privateNavigationPaths.buy) {
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
          phone: userData?.phoneNumber,
          email: userData?.email,
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

      emitTrackEvent(PosthogEvents.BuyMenuClicked)
    } else if (path === privateNavigationPaths.transactions) {
      emitTrackEvent(PosthogEvents.TransactionsMenuClicked)
    } else if (path === privateNavigationPaths.invest) {
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
          phone: userData?.phoneNumber,
          email: userData?.email,
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
      emitTrackEvent(PosthogEvents.SubscriptionMenuClicked)
    } else if (path === privateNavigationPaths.sell) {
      emitTrackEvent(PosthogEvents.SellMenuClicked)
    }
  }

  return (
    <Paper sx={styles} elevation={3} className="z-50">
      <BottomNavigation showLabels value={pathname}>
        {bottomNavigationConfig.map((config) => {
          const { path, icon: Icon, label } = config

          const to = { pathname: path }

          const iconComponent = <Icon />

          return (
            <BottomNavigationAction
              key={path}
              label={t(label)}
              onClick={() => handleOnClick(path)}
              value={path}
              icon={iconComponent}
              component={NextLinkComposed}
              to={to}
            />
          )
        })}
      </BottomNavigation>
    </Paper>
  )
}

export { BottomTabNavigation }
