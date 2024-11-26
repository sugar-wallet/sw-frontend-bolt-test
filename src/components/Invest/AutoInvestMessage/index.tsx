import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Body } from '@sw-npm-packages/components'
import { PAYMENT_FREQUENCY } from '@sw-npm-packages/constants'
import { isNumber } from '@sw-npm-packages/utils'
import { Error, Info } from 'components'
import { fetchGoldLatestPrice, minAutoInvestPerMonth } from 'config'
import { computeAutoInvest, formatMoney, userCountry } from 'helpers'

interface IPurchaseQuantityMessage {
  purchaseAmount: number
  minPurchaseAmount: number
  frequency: keyof typeof PAYMENT_FREQUENCY
}

const AutoInvestMessage: React.FC<IPurchaseQuantityMessage> = ({
  purchaseAmount,
  minPurchaseAmount,
  frequency
}) => {
  const t = useTranslations('AutoInvestPage')

  const { data } = useQuery(fetchGoldLatestPrice())

  const { perMonthAutoInvestAmount } = data || {}

  const isAmountValid = isNumber(purchaseAmount) && purchaseAmount > 0

  const {
    amount,
    totalAmount,
    frequencyLabel,
    formattedAmountWithInterest,
    rateOfInterest
  } = computeAutoInvest({
    purchaseAmount,
    frequency
  })

  const preDefinedAutoInvestValue = minAutoInvestPerMonth[userCountry] || 0

  const minInvestAmount = preDefinedAutoInvestValue
    ? preDefinedAutoInvestValue
    : perMonthAutoInvestAmount
    ? perMonthAutoInvestAmount
    : null

  if (!isNumber(minInvestAmount)) return null

  if (isAmountValid && purchaseAmount < minPurchaseAmount) {
    return (
      <Error
        message={t('minimumValue', {
          value: formatMoney(minPurchaseAmount)
        })}
      />
    )
  }

  if (!isAmountValid) return <></>

  return (
    <Info className="!flex-row mx-4 mt-6 px-8">
      <Body className="mb-1 text-sm text-black text-center">
        {
          isAmountValid &&
            t('autoInvestMessage', {
              amount,
              frequencyLabel: t(frequencyLabel),
              totalAmount,
              roi: rateOfInterest,
              amountWithInterest: formattedAmountWithInterest
            })
          // : t.rich('onAveragePeopleInvest', {
          //     amount: formatMoney(minInvestAmount),
          //     span: (content) => (
          //       <span className="font-semibold">{content}</span>
          //     )
          //   })
        }
      </Body>
    </Info>
  )
}

export { AutoInvestMessage }
