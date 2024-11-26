import { useTranslations } from 'next-intl'
import React from 'react'

import { Body, SubTitle, Title } from '@sw-npm-packages/components'
import { getDateUserDisplayFormatString } from '@sw-npm-packages/utils'
import { Info } from 'components'

interface INextPaymentDetails {
  nextPaymentDate: string | null
}

const NextPaymentDetails: React.FC<INextPaymentDetails> = ({
  nextPaymentDate
}) => {
  const t = useTranslations('AutoInvestPage')
  return (
    <Info className="items-center my-6 px-6">
      <Title className="font-light text-sm">{t('yourNextPayment')}</Title>
      <SubTitle className="text-base my-2 font-semibold">
        {getDateUserDisplayFormatString(nextPaymentDate)}
      </SubTitle>
      <Body className="font-light text-center text-xs mx-4 w-[60%]">
        {t('youCanPause')}
      </Body>
    </Info>
  )
}

export { NextPaymentDetails }
