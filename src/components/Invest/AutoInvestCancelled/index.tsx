import { useTranslations } from 'next-intl'
import React from 'react'
import { useDispatch } from 'react-redux'

import { Body, ContainedButton } from '@sw-npm-packages/components'
import { navigationPaths } from 'config'
import { emitFetchUserGoldSubscriptions } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { updateUserFinanceStatus } from 'store/actions/user-finance'
import { USER_FINANCE_STATE_KEYS } from 'store/constants/user-finance'

const AutoInvestCancelled = () => {
  const t = useTranslations('AutoInvestPage')

  const dispatch = useDispatch()

  React.useEffect(() => {
    return () => {
      // reset cancel state
      dispatch(
        updateUserFinanceStatus(USER_FINANCE_STATE_KEYS.CANCEL_INVEST_GOLD, {
          status: null,
          errorMessage: ''
        })
      )

      // refetch subscriptions data
      emitFetchUserGoldSubscriptions({ refetch: true })
    }
  }, [])

  const onReturnToHomeClick = () => {
    navigate(navigationPaths.home)
  }

  return (
    <div className="flex-1 flex-col mt-16">
      <h3 className="text-center">{t('autoInvestCancelled')}</h3>
      <Body className="text-center">{t('youWillReceive')}</Body>

      <div className="flex-1 flex-col justify-end mb-[4.5em]">
        <ContainedButton
          onClick={onReturnToHomeClick}
          className={`flex-initial btn-contained-pink`}
        >
          {t('returnToHome')}
        </ContainedButton>
      </div>
    </div>
  )
}

export { AutoInvestCancelled }
