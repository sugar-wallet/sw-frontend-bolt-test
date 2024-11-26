import { useQuery } from '@tanstack/react-query'
import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  ContainedButton,
  FullScreenLoader,
  RadioInput,
  Title
} from '@sw-npm-packages/components'
import { isEmpty } from '@sw-npm-packages/utils'
import { Error } from 'components'
import { fetchUserAkahuAccounts } from 'config'
import { setUserTransactionCookieData } from 'helpers'
import { emitFetchUserAkahuAccounts } from 'helpers/events'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { handleSellGold, updateSellGoldData } from 'store/actions/user-finance'
import {
  selectSellGoldData,
  selectSellGoldLoading
} from 'store/selectors/user-finance'

const SellAkahu = () => {
  const sellGoldData = useSelector(selectSellGoldData)
  const isSellGoldProcessing = useSelector(selectSellGoldLoading)

  const [selectedAccountId, setSelectedAccountId] = React.useState<string>()

  const dispatch = useDispatch()

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
    if (!isEmpty(selectedAccountId) && !isEmpty(sellGoldData)) {
      const data = {
        ...sellGoldData,
        account_id: selectedAccountId
      }

      dispatch(updateSellGoldData(data))

      setUserTransactionCookieData(data)

      dispatch(handleSellGold())
    }
  }

  const loading = isLoading || isFetching || isRefetching

  const { accounts = [] } = data || {}

  const isContinueDisabled = isEmpty(selectedAccountId) || isSellGoldProcessing

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
                <div className="flex-1 flex-grow justify-center items-center">
                  <Error message={error} />
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
          isLoading={isSellGoldProcessing}
          className="btn-fixed-bottom btn-contained-pink font-normal !bottom-[3.5em]"
        >
          {'continue'}
        </ContainedButton>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default SellAkahu
