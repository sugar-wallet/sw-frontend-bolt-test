import { useTranslations } from 'next-intl'
import React from 'react'

import { getCountryCode } from '@sw-npm-packages/config'
import { SupportedCurrencySymbols } from '@sw-npm-packages/constants'
import { Accordion } from 'components'

const PrePurchaseFAQ = () => {
  const t = useTranslations('BuyPage')
  const countryCode = getCountryCode()
  const items = [
    {
      title: t('our-fees'),
      content: (
        <div className="flex-col px-4">
          <div>{t('wePrideOurselves')}</div>
          <ul className="list-disc mt-2">
            {countryCode !== SupportedCurrencySymbols.INR && (
              <li>{t('transactionFee')}</li>
            )}
            <li>{t('storageFee')}</li>
            <li>{t('buySellSpread')}</li>
          </ul>
          <div className="mt-2">{t('goldShopPremiums')}</div>
        </div>
      )
    },
    {
      title: t('ourCompanyAndTeam'),
      content: (
        <div className="flex-col">
          <div className="mt-2">{t('signedUpUsersGlobally')}</div>
          <div className="mt-2">{t('registeredInNewZealand')}</div>
          <div className="mt-2">{t('officialNumber')}</div>
        </div>
      )
    },
    {
      title: t('transactions'),
      content: (
        <div className="flex-col">
          <div className="font-medium italic mt-2">{t('purchases')}</div>
          <div className="mt-2">{t('whenYouPurchaseGold')}</div>
          <div className="mt-4 font-medium italic">{t('withdrawals')}</div>
          <div className="mt-2">{t('whenYouSellGold')}</div>
        </div>
      )
    }
  ]

  return (
    <div className="flex-col mt-8">
      <Accordion items={items} />
    </div>
  )
}

export { PrePurchaseFAQ }
