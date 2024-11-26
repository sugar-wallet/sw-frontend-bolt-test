import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { Error, Info } from 'components'
import { formatMoney, computePurchaseGoldQuantity } from 'helpers'

interface IPurchaseQuantityMessage {
  purchaseAmount: number
  perUnitAmount: number
  minPurchaseAmount: number
  currencySymbol: string | null
  showMessage: boolean
}

const PurchaseQuantityMessage: React.FC<IPurchaseQuantityMessage> = ({
  purchaseAmount,
  perUnitAmount,
  minPurchaseAmount,
  showMessage
}) => {
  const t = useTranslations('BuyPage')
  if (!showMessage) return null
  if (purchaseAmount < minPurchaseAmount) {
    return (
      <Error
        message={t('minimumValue', {
          value: formatMoney(minPurchaseAmount)
        })}
      />
    )
  }

  const quantity = computePurchaseGoldQuantity({
    purchaseAmount,
    perUnitAmount
  })

  return (
    <Info alert className="all-sides-shadow my-4">
      <div className="flex-1 flex-col ml-2">
        <Title className="mb-1 text-sm text-black">
          {t.rich('descTitle', {
            quantity,
            span: (content) => <span className="font-semibold">{content}</span>
          })}
        </Title>
        <SubTitle className="text-sm text-black">{t('descSubtitle')}</SubTitle>
      </div>
    </Info>
  )
}

export { PurchaseQuantityMessage }
