import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { FlatInput } from '@sw-npm-packages/components'
import { Unit } from '@sw-npm-packages/constants'
import { Info } from 'components'
import { fetchGoldLatestPrice, fetchUserBalance } from 'config'
import {
  computeGoldBalanceForUI,
  computeRemainingGoldUnit,
  computeSellGoldValue,
  computeSellGoldValueViaAmount
} from 'helpers'

const SellInput = ({
  value,
  setValue,
  error,
  setError,
  setDisabled
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const t = useTranslations('SellPage')
  const { data } = useQuery(fetchGoldLatestPrice())
  const { data: balance, isSuccess } = useQuery(fetchUserBalance())
  const { unit: rawUnit, currency, weightUnits } = balance || {}
  const { formattedSellRate, minSellAmount } = data || {}
  const { goldUnit: unit, weightUnit: weightUnitUI } =
    computeGoldBalanceForUI(rawUnit, weightUnits) || {}
  const minSellUnit = computeSellGoldValueViaAmount({
    amount: Number(minSellAmount),
    perUnitAmount: Number(formattedSellRate),
    weightUnitUI
  })

  const isAmountComputable =
    value &&
    Number(value) >= minSellUnit &&
    formattedSellRate &&
    currency &&
    unit &&
    !error

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (/^\d*\.?\d*$/.test(val) && val.length < 8) {
      setValue(val)
      if (unit && Number(val) > Number(unit)) {
        setError(t('notEnoughGold'))
        setDisabled(true)
      } else if (minSellUnit && Number(val) < minSellUnit) {
        setError(
          t('minimumValue', {
            value: `${minSellUnit}${weightUnitUI}`
          })
        )
        setDisabled(true)
      } else {
        setError('')
        setDisabled(false)
      }
    } else {
      setDisabled(false)
    }
    if (Number(val) === 0) {
      setDisabled(true)
    }
  }

  if (!isSuccess) return <></>
  return (
    <div className="mt-16 max-xs:mt-4 flex-col justify-center items-center">
      <FlatInput
        placeholder={t('enterUnit', {
          unit: weightUnitUI
        })}
        type="number"
        value={value}
        onChange={onChange}
        inputClassNames="!text-[1.6rem]"
        error={error}
        isErrorTranslated
      />
      {isAmountComputable ? (
        <Info className="mt-8">
          <div className="text-center">
            {t.rich('descTitle', {
              amount: computeSellGoldValue({
                goldUnit: Number(value),
                perUnitAmount: formattedSellRate,
                weightUnitUI: weightUnitUI || Unit.MG
              }),
              unit: computeRemainingGoldUnit({
                totalGoldUnit: Number(unit),
                sellGoldUnit: Number(value),
                weightUnit: weightUnitUI
              }),
              span: (chunks) => (
                <span className="contents font-semibold">{chunks}</span>
              )
            })}
          </div>
          <div className="justify-center w-full">
            <div className="border-solid border-b-[0.75px] w-4 border-light-gray h-2 mb-2"></div>
          </div>
          <div className="text-center">{t('descSubtitle')}</div>
        </Info>
      ) : null}
    </div>
  )
}

export { SellInput }
