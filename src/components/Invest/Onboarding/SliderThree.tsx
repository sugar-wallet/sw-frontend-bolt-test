import { useQuery } from '@tanstack/react-query'
import { isNumber } from 'lodash'
import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { PAYMENT_FREQUENCY } from '@sw-npm-packages/constants'
import { GrowthGraphImage } from 'assets/images'
import { ImageComponent as Image } from 'components'
import { fetchGoldLatestPrice, minAutoInvestPerMonth } from 'config'
import { computeReturn, formatMoney, userCountry } from 'helpers'

const SliderThree = () => {
  const t = useTranslations('AutoInvestPage')

  const { data } = useQuery(fetchGoldLatestPrice())

  const { perMonthAutoInvestAmount } = data || {}

  const isValidInvestAmount = isNumber(perMonthAutoInvestAmount)

  const preDefinedAutoInvestValue = minAutoInvestPerMonth[userCountry] || 0

  const amount = preDefinedAutoInvestValue
    ? preDefinedAutoInvestValue
    : isValidInvestAmount
    ? perMonthAutoInvestAmount
    : null

  const formattedAmount = isNumber(amount) ? formatMoney(amount) : null

  return (
    <div className="flex-col items-center mb-24">
      <h3>{t('yourFuture')}</h3>
      <div className="slider-image-container min-h-[27vh] my-16">
        <Image
          src={GrowthGraphImage}
          alt="grwoth-graph-image"
          className="w-full"
        />
      </div>
      <div className="flex-col items-center mt-6">
        {amount ? (
          <div className="flex-col">
            <Title className="text-xl">
              {t('if1000tl', {
                amount: formattedAmount
              })}
            </Title>
            <h3 className="font-normal">
              {t.rich('in10years', {
                amount: formatMoney(amount * 12 * 10),
                span: (content) => <span className="text-pink">{content}</span>
              })}
            </h3>
            <SubTitle className="text-base mt-4 mx-4">
              {t('xPercentReturn', {
                amount: formatMoney(
                  computeReturn({
                    amount,
                    frequency: PAYMENT_FREQUENCY.MONTHLY
                  })
                ),
                roi: 10
              })}
            </SubTitle>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { SliderThree }
