import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

import { FullScreenLoader } from '@sw-npm-packages/components'
import { LimitedTimeBanner, TransactionList } from 'components'
import { fetchUserTransactions } from 'config'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'

const Transactions = () => {
  const { isLoading } = useQuery(fetchUserTransactions())
  const t = useTranslations('TransactionsPage')

  if (isLoading) return <FullScreenLoader />
  return (
    <BottomNavigationLayout>
      <PrimaryLayout title={t('title')}>
        <div className="flex-col w-full">
          <LimitedTimeBanner />
          <TransactionList />
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default Transactions
