import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  ContainedButton,
  FullScreenLoader,
  RadioInput,
  Title
} from '@sw-npm-packages/components'
import { COOKIE_KEYS, PAYMENT_TYPES } from '@sw-npm-packages/constants'
import { getUserIdFromJWT, isEmpty } from '@sw-npm-packages/utils'
import { Error } from 'components'
import {
  fetchUserAkahuAccounts,
  fetchUserProfile,
  navigationPaths
} from 'config'
import {
  extractQueryValueFromSearchParams,
  gtmPushEvent,
  setUserAutoInvestGoldData,
  setUserBuyGoldData
} from 'helpers'
import { emitFetchUserAkahuAccounts } from 'helpers/events'
import { navigate } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import {
  handleAkahuUserTokenRegistration,
  handleAutoInvestGold,
  handleBuyGold,
  updateAutoInvestGoldData,
  updateBuyGoldData
} from 'store/actions/user-finance'
import { selectIsPaymentIntentProcessing } from 'store/selectors/payment'
import {
  selectAutoInvestGoldData,
  selectBuyGoldData
} from 'store/selectors/user-finance'

const AkahuAccounts = () => {
  const buyGoldData = useSelector(selectBuyGoldData)
  const autoInvestGoldData = useSelector(selectAutoInvestGoldData)
  const isPaymentIntentProcessing = useSelector(selectIsPaymentIntentProcessing)

  const { data: userData } = useQuery(fetchUserProfile())

  const [selectedAccountId, setSelectedAccountId] = React.useState<string>()

  const [amount_bought] = React.useState<string | null>(() => {
    return localStorage.getItem('amount_bought')
  })

  const dispatch = useDispatch()

  const type = extractQueryValueFromSearchParams(window.location.search, 'type')

  const { data, isLoading, isFetching, isRefetching, error } = useQuery(
    fetchUserAkahuAccounts()
  )

  React.useEffect(() => {
    emitFetchUserAkahuAccounts({ refetch: true })
  }, [])

  const onBankSelection = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAccountId(e.target.value)
  }

  const onContinueClick = () => {
    if (!isEmpty(selectedAccountId)) {
      const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
      const userId = getUserIdFromJWT(token)

      if (type === PAYMENT_TYPES.ONE_TIME && !isEmpty(buyGoldData)) {
        const data = {
          ...buyGoldData,
          account_id: selectedAccountId
        }

        gtmPushEvent('begin_checkout', {
          ecommerce: {
            payment_type: 'one time', // one time / subscription,
            value: undefined,
            currency: 'NZD',
            items: [
              {
                item_id: undefined,
                item_name: 'gold',
                index: 0,
                item_brand: undefined,
                item_category: undefined,
                item_category2: undefined,
                item_category3: undefined,
                item_category4: undefined,
                item_category5: undefined,
                item_variant: undefined,
                price: undefined,
                quantity: undefined,
                currency: 'NZD'
              }
            ]
          },
          user_data: {
            id: userId, // Add the unique User ID here
            phone: userData?.phoneNumber,
            email: userData?.email,
            address: {
              city: undefined,
              gender: undefined,
              address: undefined,
              state: undefined,
              country: undefined,
              postal_code: undefined,
              first_name: undefined,
              last_name: undefined
            }
          }
        })

        dispatch(updateBuyGoldData(data))

        setUserBuyGoldData(data)

        const amount_bought = localStorage.getItem('amount_bought')
        if (amount_bought && Number(amount_bought) > 0) {
          dispatch(handleBuyGold())
        } else {
          navigate(navigationPaths.prePurchaseInfo)
        }
      } else if (
        type === PAYMENT_TYPES.SUBSCRIPTION &&
        !isEmpty(autoInvestGoldData)
      ) {
        const data = {
          ...autoInvestGoldData,
          account_id: selectedAccountId
        }

        gtmPushEvent('begin_checkout', {
          ecommerce: {
            payment_type: 'subscription', // one time / subscription,
            value: undefined,
            currency: 'NZD',
            items: [
              {
                item_id: undefined,
                item_name: 'gold subscription',
                index: 0,
                item_brand: undefined,
                item_category: undefined,
                item_category2: undefined,
                item_category3: undefined,
                item_category4: undefined,
                item_category5: undefined,
                item_variant: undefined,
                price: undefined,
                quantity: undefined,
                currency: 'NZD'
              }
            ]
          },
          user_data: {
            id: userId, // Add the unique User ID here
            phone: userData?.phoneNumber,
            email: userData?.email,
            address: {
              city: undefined,
              gender: undefined,
              address: undefined,
              state: undefined,
              country: undefined,
              postal_code: undefined,
              first_name: undefined,
              last_name: undefined
            }
          }
        })

        dispatch(updateAutoInvestGoldData(data))

        setUserAutoInvestGoldData(data)

        dispatch(handleAutoInvestGold())
      }
    }
  }

  const onConnectClick = () => {
    dispatch(handleAkahuUserTokenRegistration(true)) // force connect to akahu
  }

  const loading = isLoading || isFetching || isRefetching

  const { accounts = [] } = data || {}

  const isSubscriptionInProgress =
    type === PAYMENT_TYPES.SUBSCRIPTION && isPaymentIntentProcessing

  const isContinueDisabled =
    ![PAYMENT_TYPES.ONE_TIME, PAYMENT_TYPES.SUBSCRIPTION].includes(
      type as string
    ) ||
    isEmpty(selectedAccountId) ||
    isSubscriptionInProgress

  const accountNotConnected =
    error && error?.response?.data?.message === 'User has not connected Akahu'

  return (
    <BottomNavigationLayout>
      <PrimaryLayout>
        <div className="flex-1 flex-col">
          <div className="flex-1 flex-col pb-56">
            <Title className="self-center mb-4 font-medium">
              Select an Account
            </Title>
            <div className="flex-1 flex-grow">
              {loading ? (
                <FullScreenLoader />
              ) : error ? (
                <div className="flex-1 flex-grow justify-center items-center flex-col">
                  <Error
                    message={error?.response?.data?.message || error?.message}
                  />
                  <div>
                    {accountNotConnected ? (
                      <ContainedButton
                        onClick={onConnectClick}
                        className="btn-contained-pink font-normal p-4"
                      >
                        {'Connect Now'}
                      </ContainedButton>
                    ) : null}
                  </div>
                </div>
              ) : accounts ? (
                <div className="mt-4">
                  <RadioInput
                    name="account"
                    inputContainerClassNames="m-3"
                    inputLabelClassNames="pl-4 text-sm"
                    value={selectedAccountId}
                    options={accounts.map((account) => ({
                      label: account.account_name,
                      value: account.account_id
                    }))}
                    onChange={onBankSelection}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <ContainedButton
          onClick={onContinueClick}
          disabled={isContinueDisabled}
          isLoading={isSubscriptionInProgress}
          className="btn-fixed-bottom btn-contained-pink font-normal !bottom-[3.5em]"
        >
          {type === PAYMENT_TYPES.SUBSCRIPTION
            ? 'complete subscription'
            : amount_bought && Number(amount_bought) > 0
            ? 'Confirm'
            : 'Continue'}
        </ContainedButton>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default AkahuAccounts
