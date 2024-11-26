import { useQuery } from '@tanstack/react-query'
import { isNumber } from 'lodash'
import { useTranslations } from 'next-intl'
import React from 'react'

import { SubTitle, Title } from '@sw-npm-packages/components'
import { MoneyImage } from 'assets/images'
import { ImageComponent as Image } from 'components'
import { fetchGoldLatestPrice } from 'config'
import { formatMoney } from 'helpers'

const SliderTwo = () => {
  const t = useTranslations('AutoInvestPage')

  const { data } = useQuery(fetchGoldLatestPrice())

  const { perMonthAutoInvestAmount } = data || {}

  return (
    <div className="flex-col items-center mb-24">
      <h3>{t('howMuchToInvest')}</h3>
      <div className="slider-image-container min-h-[27vh] mt-8">
        <Image src={MoneyImage} alt="money-image" className="w-full" />
      </div>
      <div className="flex-col items-center mt-6">
        <Title className="text-2xl font-medium">{t('chooseYourAmount')}</Title>
        <SubTitle className="text-base mt-4 mx-4">
          {isNumber(perMonthAutoInvestAmount)
            ? t('onAverageMostInvest', {
                amount: formatMoney(perMonthAutoInvestAmount)
              })
            : null}
        </SubTitle>
      </div>
    </div>
  )
}

export { SliderTwo }
