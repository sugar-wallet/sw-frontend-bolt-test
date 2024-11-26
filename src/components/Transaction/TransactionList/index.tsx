import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { fetchUserTransactions } from 'config'

import { TransactionDay } from '..'

const TransactionList = () => {
  const { data } = useQuery(fetchUserTransactions())

  return (
    <div className="flex-col w-full px-4 pb-20 text-light-gray">
      {data
        ? Object.keys(data).map((dateKey) => (
            <TransactionDay key={dateKey} date={dateKey} data={data[dateKey]} />
          ))
        : null}
    </div>
  )
}

export { TransactionList }
