import React from 'react'

import { Title } from '@sw-npm-packages/components'
import { ITransactionItem } from '@sw-npm-packages/types'
import { getFormattedDateString } from '@sw-npm-packages/utils'

import { TransactionItem } from '..'

const TransactionDay = ({
  date,
  data
}: {
  date: string
  data: ITransactionItem[]
}) => {
  return (
    <div className="flex-col w-full mt-4">
      <Title className="text-xs font-light text-black">
        {getFormattedDateString(date)}
      </Title>
      {data.map((item, index) => (
        <div className="flex-col" key={index}>
          <TransactionItem data={item} />
          <hr className="my-2" />
        </div>
      ))}
    </div>
  )
}

export { TransactionDay }
