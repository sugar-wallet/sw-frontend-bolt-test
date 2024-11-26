import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { Live } from 'components'
import { fetchGoldLatestPrice } from 'config'
import { emitFetchGoldLatestPrice } from 'helpers/events'

const BuyLivePrice = () => {
  const t = useTranslations('BuyPage')

  const router = useRouter()

  const { data } = useQuery(fetchGoldLatestPrice())

  React.useEffect(() => {
    emitFetchGoldLatestPrice({ refetch: true })
  }, [router.pathname])

  const { formattedBuyRateWithCurrency } = data || {}

  return (
    <div className="bg-white all-sides-shadow px-4 py-4 rounded-lg my-4 flex-col flex-shrink">
      <div className="flex-row justify-between">
        <Title className="text-gold font-medium">{t('buyingPrice')}</Title>
        <Live />
      </div>
      <SubTitle className="lowercase mt-1">
        <span className="font-medium text-xxl">
          {formattedBuyRateWithCurrency}
        </span>{' '}
        &nbsp;
        {t('pricePerUnit')}
      </SubTitle>
    </div>
  )
}

export { BuyLivePrice }
