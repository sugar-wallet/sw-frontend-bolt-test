import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import { SupportedCurrencySymbols } from '@sw-npm-packages/constants'
import { ButtonVariant } from '@sw-npm-packages/types'
import { LimitedTimeBanner } from 'components'
import {
  fetchGoldLatestPrice,
  fetchUserBalance,
  // fetchUserProfile,
  navigationPaths
} from 'config'
import {
  computeGoldBalanceForUI,
  computeSellGoldValue,
  getSellGoldData
  // isUserSecurityPinSet
} from 'helpers'
import { goBack, navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout, SecondaryLayout } from 'layouts'
import { selectSellGoldData } from 'store/selectors/user-finance'

const SellConfirmPage = () => {
  const t = useTranslations('SellConfirmPage')
  // const [isModalOpen, setModalOpen] = useState(false)
  const sellData = useSelector(selectSellGoldData, shallowEqual)
  const { data: balance } = useQuery(fetchUserBalance())
  const { data } = useQuery(fetchGoldLatestPrice())
  // const { data: userData } = useQuery(fetchUserProfile())
  const { unit: rawUnit, weightUnits: rawWeightUnit, currency } = balance || {}
  const { formattedSellRate } = data || {}
  // const { showWarning = true } = userData || {}
  const { goldUnit: unit, weightUnit: weightUnits } =
    computeGoldBalanceForUI(rawUnit, rawWeightUnit) || {}

  const isSellAll = sellData.quantity === 0

  // const isSecurityPinSet = isUserSecurityPinSet()

  useEffect(() => {
    const sellGoldData = getSellGoldData()
    if (!sellGoldData) navigate(navigationPaths.sell, true)
  }, [])

  // const handleModalOpen = () => {
  //   setModalOpen(true)
  // }

  // const handleModalClose = () => {
  //   setModalOpen(false)
  // }

  const handleSell = () => {
    // if (isSecurityPinSet) {
    //   navigate(navigationPaths.enterSecurityPin)
    // } else {
    //   navigate(navigationPaths.createSecurityPin)
    // }
    if (currency === SupportedCurrencySymbols.NZD) {
      navigate(navigationPaths.sellAkahu)
    } else {
      navigate(navigationPaths.sellBankDetails)
    }
  }

  const handleContinue = () => {
    // if (isGlobalApp && showWarning) {
    //   handleModalOpen()
    // } else {
    handleSell()
    // }
  }

  const handleGoBack = () => {
    goBack()
  }

  if (!weightUnits) return <></>
  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('sellGold')}>
        <SecondaryLayout
          title={isSellAll ? t('areYouSureSellAll') : t('areYouSure')}
          subTitle=" "
          footer={
            <>
              <div
                className={`bg-azure p-4 text-sm font-normal text-center justify-center ${
                  currency === SupportedCurrencySymbols.INR ? 'hidden' : ''
                }`}
              >
                {t('descTitle')}
              </div>
              <div className="w-full justify-center font-semibold mt-4 text-sm">
                {t('descSubtitle')}
              </div>
            </>
          }
          footerPrimaryBtnLabel={t('confirm')}
          footerPrimaryBtnOnClick={handleContinue}
          footerPrimaryBtnVariant={ButtonVariant.OUTLINED}
          footerPrimaryBtnClassName="btn-outlined-pink"
          footerSecondaryBtnLabel={t('cancel')}
          footerSecondaryBtnOnClick={handleGoBack}
          footerSecondaryBtnVariant={ButtonVariant.CONTAINED}
          footerSecondaryBtnClassName="btn-contained-pink"
        >
          <div className="flex-col justify-center items-center">
            <LimitedTimeBanner />
            <div className="mt-8 justify-center">
              {t.rich('sellGoldUnit', {
                unit: isSellAll
                  ? `${unit}${weightUnits}`
                  : `${sellData.quantity}${weightUnits}`,
                span: (chunks) => (
                  <span className="contents text-pink font-semibold">
                    {chunks}
                  </span>
                )
              })}
            </div>
            <div className="mt-6 justify-center items-center flex-col">
              <div>{t('youWillReceive')}</div>
              <div className="text-pink font-semibold">
                {computeSellGoldValue({
                  goldUnit: isSellAll ? Number(unit) : sellData.quantity,
                  perUnitAmount: formattedSellRate || 0,
                  weightUnitUI: weightUnits
                })}
              </div>
            </div>
          </div>
        </SecondaryLayout>
      </PrimaryLayout>
      {/* <CustomModal open={isModalOpen} onClose={handleModalClose}>
        <SellConfirmModal onContinue={handleSell} onClose={handleModalClose} />
      </CustomModal> */}
    </BottomNavigationLayout>
  )
}

export default SellConfirmPage
