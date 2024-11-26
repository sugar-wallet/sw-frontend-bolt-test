import { useTranslations } from 'next-intl'
import React from 'react'

import { ContainedButton } from '@sw-npm-packages/components'
import {
  CurrencySymbol,
  PAYMENT_FREQUENCY,
  PAYMENT_FREQUENCY_OPTIONS,
  SupportedCurrencySymbols
} from '@sw-npm-packages/constants'

interface IPaymentFrequency {
  isCampaignMode: boolean
  currency: CurrencySymbol
  frequency: keyof typeof PAYMENT_FREQUENCY
  onFrequencyChange: (value: string) => void
}

const PaymentFrequency: React.FC<IPaymentFrequency> = ({
  frequency,
  onFrequencyChange,
  isCampaignMode,
  currency
}) => {
  const t = useTranslations('AutoInvestPage')
  if (isCampaignMode) return <></>

  const values = currency
    ? PAYMENT_FREQUENCY_OPTIONS[currency as unknown as SupportedCurrencySymbols]
    : {}

  // currency === CurrencySymbol.INR
  //   ? LESS_FREQUENT_PAYMENT_FREQUENCY
  //   : PAYMENT_FREQUENCY

  return (
    <div className="mt-4 w-full flex-col">
      {/* <Title className="ml-2 mb-4 text-lg font-medium">{t('frequency')}</Title> */}
      <div className="flex-row justify-center my-3 w-full">
        {Object.values(values).map((value) => {
          const isSelected = frequency === value

          return (
            <div key={value} className="flex-1 max-w-[33%]">
              <ContainedButton
                onClick={() => onFrequencyChange(value)}
                style={{padding: '10px'}}
                className={`btn-contained-black !text-base capitalize mx-1 shadow-lg ${
                  !isSelected ? 'btn-contained-deselected' : null
                }`}
              >
                {t(value)}
              </ContainedButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { PaymentFrequency }
