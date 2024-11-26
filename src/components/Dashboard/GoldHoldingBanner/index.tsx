import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useTranslations, useFormatter } from 'next-intl'
import React from 'react'

import { OutlinedButton, SubTitle, Title } from '@sw-npm-packages/components'
import { PAYMENT_FREQUENCY_LABEL } from '@sw-npm-packages/constants'
import { ChevronRightIcon } from '@sw-npm-packages/icons'
import { isEmpty } from '@sw-npm-packages/utils'
import { GoldBarImage } from 'assets/images'
import {
  fetchUserBalance,
  fetchUserGoldSubscriptions,
  navigationPaths
} from 'config'
import {
  computeGoldBalance,
  computeGoldBalanceForUI,
  formatMoney
} from 'helpers'
import { navigate } from 'helpers/navigation'

const GoldHoldingBanner = () => {
  const t = useTranslations('HomePage')
  const format = useFormatter()
  const { data, isSuccess } = useQuery(fetchUserBalance())
  const { data: subscriptionData } = useQuery(fetchUserGoldSubscriptions())

  const { unit: rawUnit, weightUnits: rawWeightUnit } = data || {}
  const { frequency, currency, amount } = subscriptionData || {}
  const { goldUnit: unit, weightUnit: weightUnits } =
    computeGoldBalanceForUI(rawUnit, rawWeightUnit) || {}

  const onBuyGoldClick = () => {
    navigate(navigationPaths.myGold)
  }

  return (
    <div className="h-[184px] bg-black rounded-lg p-4 justify-between">
      <div className="flex-col justify-between">
        <div className="flex-col">
          {isSuccess ? (
            <>
              <Title className="text-white font-medium mb-2">
                {t('yourCollection')}
              </Title>
              <SubTitle className="text-white font-light">
                {`${computeGoldBalance(unit, weightUnits)} ${t('ofGold')}`}
              </SubTitle>
            </>
          ) : null}
          {!isEmpty(subscriptionData) ? (
            <div className="mt-1 flex-col">
              <Title className="text-semi-gray font-light text-xs my-1">
                {t('investing')}
              </Title>
              <SubTitle className="text-white font-light text-sm mt-1">
                {formatMoney(Number(amount))}{' '}
                {t(PAYMENT_FREQUENCY_LABEL[frequency as string])}
              </SubTitle>
            </div>
          ) : null}
        </div>
        <div>
          <OutlinedButton
            icon={
              <div className="ml-1">
                <ChevronRightIcon color="var(--white)" />
              </div>
            }
            iconPosition="right"
            className="!text-sm px-4 !py-0.5"
            onClick={onBuyGoldClick}
          >
            {t('openSafe')}
          </OutlinedButton>
        </div>
      </div>
      <div className="w-[132px]">
        <Image src={GoldBarImage} alt={t('goldBarImageAlt')} />
      </div>
    </div>
  )
}

export { GoldHoldingBanner }
