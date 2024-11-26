import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { Unit } from '@sw-npm-packages/constants'
import { Live } from 'components'
import { fetchGoldLatestPrice, navigationPaths } from 'config'
import { getUnitLabel } from 'helpers'
import { emitFetchGoldLatestPrice } from 'helpers/events'
import { ChevronRightIcon } from '@sw-npm-packages/icons'
import { navigate } from 'helpers/navigation'

const LivePrice = () => {
  const t = useTranslations('HomePage')
  const { data } = useQuery(fetchGoldLatestPrice())

  const router = useRouter()

  React.useEffect(() => {
    emitFetchGoldLatestPrice({ refetch: true })
  }, [router.pathname])

  const {
    formattedBuyRateWithCurrency,
    formattedSellRateWithCurrency,
    unit = Unit.MG
  } = data || {}

  const navigateToPriceHistory = () => {
    navigate(navigationPaths.priceHistory)
  }

  return (
    <div className='all-sides-shadow px-4 py-4 rounded-lg my-4 flex-col'>
      <div className="bg-white justify-between ">
        <div className="flex-col">
          <Live />
          <SubTitle className="mt-3 text-xs">
            {t('goldPricesPerUnit', {
              unit: unit ? t(getUnitLabel(unit as Unit)) : ''
            })}
          </SubTitle>
        </div>
        <div className="flex-col">
          <Title className="text-light-gray font-medium text-sm">
            {t('buy')}
          </Title>
          <SubTitle className="mt-2">{formattedBuyRateWithCurrency}</SubTitle>
        </div>
        <div className="flex-col">
          <Title className="text-light-gray font-medium text-sm">
            {t('sell')}
          </Title>
          <SubTitle className="mt-2">{formattedSellRateWithCurrency}</SubTitle>
        </div>
      </div>
      <div onClick={navigateToPriceHistory} className="items-center text-xs rounded-full mt-4 self-start">
        <Title className="text-semi-gray text-sm mr-2">
          {t('priceHistory')}
        </Title>
        <ChevronRightIcon color="var(--semi-gray)" size={12} />
      </div>
    </div>
  )
}

export { LivePrice }
