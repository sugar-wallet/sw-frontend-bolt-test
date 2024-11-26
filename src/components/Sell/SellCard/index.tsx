import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Live } from 'components'
import { fetchGoldLatestPrice, fetchUserBalance } from 'config'
import { computeGoldBalance, formatMoney } from 'helpers'

const SellCard = () => {
  const t = useTranslations('SellPage')
  const { data } = useQuery(fetchGoldLatestPrice())
  const { data: balance, isSuccess } = useQuery(fetchUserBalance())

  const { unit, weightUnits, amount } = balance || {}
  const { formattedSellRateWithCurrency } = data || {}
  

  if (!isSuccess) return <></>

  return (
    <div className="flex-col p-4 shadow-md rounded-md">
      <div className="flex-col w-full">
        <div className="justify-between w-full">
          <div className="text-medium text-gold">{t('sellingPrice')}</div>
          <Live />
        </div>
        <div className="justify-start items-center mt-1">
          <div className="text-xxl font-medium">
            {formattedSellRateWithCurrency}
          </div>
          <div className="ml-1 lowercase">{t('pricePerUnit')}</div>
        </div>
      </div>
      <div className="border-solid border-b-[1px] border-light-gray-2 w-full h-4 mb-4"></div>
      <div className="justify-between w-full">
        <div className="flex-col">
          <div className="text-xs text-semi-gray">{t('youOwn')}</div>
          <div className="justify-start items-center  mt-1">
            <div className="text-xxl">
              {computeGoldBalance(unit, weightUnits)}
            </div>
            <div className="text-xs ml-1 lowercase">{t('ofGold')}</div>
          </div>
        </div>
        <div className="flex-col">
          <div className="text-xs text-semi-gray">{t('approxValue')}</div>
          <div className="text-xxl mt-1">{formatMoney(Number(amount))}</div>
        </div>
      </div>
    </div>
  )
}

export { SellCard }
