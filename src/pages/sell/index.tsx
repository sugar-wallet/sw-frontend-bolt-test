import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { PosthogEvents } from '@constants'
import {
  ContainedButton,
  OutlinedButton,
  TextButton
} from '@sw-npm-packages/components'
import { getCountryCode } from '@sw-npm-packages/config'
import { Unit } from '@sw-npm-packages/constants'
import { Info, LimitedTimeBanner, SellCard, SellInput } from 'components'
import { fetchGoldLatestPrice, fetchUserBalance, navigationPaths } from 'config'
import {
  computeGoldBalance,
  computeGoldBalanceForUI,
  computeSellGoldValueViaAmount,
  setUserTransactionCookieData
} from 'helpers'
import { emitTrackEvent } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { updateSellGoldData } from 'store/actions/user-finance'

const SellPage = () => {
  const t = useTranslations('SellPage')
  const ct = useTranslations('Common')

  const dispatch = useDispatch()
  const { data } = useQuery(fetchGoldLatestPrice())
  const { data: balance } = useQuery(fetchUserBalance())
  // const { data: userData } = useQuery(fetchUserProfile())
  const countryCode = getCountryCode()

  const { unit: rawUnit, weightUnits: rawWeightUnit } = balance || {}

  const { formattedSellRate, minSellAmount } = data || {}
  const { goldUnit: unit, weightUnit: weightUnits } =
    computeGoldBalanceForUI(rawUnit, rawWeightUnit) || {}

  const minSellUnit = computeSellGoldValueViaAmount({
    amount: Number(minSellAmount),
    perUnitAmount: Number(formattedSellRate),
    weightUnitUI: weightUnits
  })

  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [isDisabled, setDisabled] = useState(true)

  // const seventhDecStart = dayjs('2023-12-07T00:00:00')
  // const userCreatedAt = dayjs(userData?.createdAt)
  const sellAll = Number(value) === Number(unit)

  useEffect(() => {
    emitTrackEvent(PosthogEvents.SellPageViewed)
  }, [])

  const handleSellAll = () => {
    setValue(unit?.toString() || '')
    setError('')
    if (minSellUnit && Number(unit) < minSellUnit) {
      setError(
        t('minimumValue', {
          value: `${minSellUnit}${weightUnits}`
        })
      )
      setDisabled(true)
    } else if (Number(unit) > 0) {
      setDisabled(false)
    }
  }

  const handleCancel = () => {
    navigate(navigationPaths.home)
  }

  const handleSubmit = () => {
    if (!value || Number(value) <= 0) {
      setError('pleaseEnterAmount')
    } else if (formattedSellRate) {
      emitTrackEvent(
        sellAll
          ? PosthogEvents.SellAllGoldClicked
          : PosthogEvents.SellGoldClicked,
        {
          unit: value,
          rate: formattedSellRate
        }
      )

      const data = {
        quantity: sellAll ? 0 : Number(value),
        unit: weightUnits as Unit,
        perUnitSellPrice: formattedSellRate
      }
      setUserTransactionCookieData({
        sellGoldData: data
      })
      dispatch(updateSellGoldData(data))
      navigate(navigationPaths.sellConfirm)
    }
  }

  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('sellGold')}>
        <div className="flex-1 relative flex-col">
          <LimitedTimeBanner />
          <div className="flex-col p-4 pb-16 max-xs:p-0 flex-1">
            <SellCard />
            <SellInput
              value={value}
              setValue={setValue}
              error={error}
              setError={setError}
              setDisabled={setDisabled}
            />
            {!['TR', 'NZ'].includes(countryCode) && (
              <div className="flex-col mt-8 mb-36 max-xs:mb-48">
                <div className="w-full text-red flex-center">Notice</div>
                <Info className="mt-4 text-red">
                  {ct('minWaitingTimeForSell', {
                    day: 15
                  })}
                </Info>
              </div>
            )}
          </div>

          <div className="w-full fixed bottom-btn flex-col pr-8">
            <ContainedButton
              className="btn-contained-pink"
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              {t('sellUnit', {
                unit: value ? computeGoldBalance(value, weightUnits) : ''
              })}
            </ContainedButton>
            {sellAll ? (
              <OutlinedButton
                className="w-full mt-4"
                primaryColor="pink"
                onClick={handleCancel}
              >
                {t('cancel')}
              </OutlinedButton>
            ) : (
              <TextButton
                className="text-semi-gray w-full mt-2 underline"
                onClick={handleSellAll}
              >
                {t('sellAllGold')}
              </TextButton>
            )}
          </div>
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default SellPage
