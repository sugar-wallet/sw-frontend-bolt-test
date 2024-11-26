import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { Loader, SubTitle, Title } from '@sw-npm-packages/components'
import { fetchUserGifts } from 'config'
import { formatMoney } from 'helpers'

const GiftInfo = () => {
  const { data, isLoading } = useQuery(fetchUserGifts())
  const {
    // totalGiftValue,
    totalGiftPending,
    totalGiftCredited,
    totalGiftPendingList
  } = data || {}

  if (isLoading)
    return (
      <div className="w-full flex-center">
        <Loader />
      </div>
    )
  return (
    <>
      {totalGiftCredited && (
        <>
          <div className="mt-4 px-4 flex-col text-center justify-center w-full mb-6">
            <Title className="text-lg font-semibold">
              {formatMoney(Number(totalGiftCredited))} Gold Credit Total
            </Title>
            <SubTitle className="text-sm">
              has been added to your balance!
            </SubTitle>
          </div>
          <hr />
        </>
      )}

      <div className="mt-4 px-4 text-lg font-semibold text-center text-black justify-center w-full">
        <span className="mr-2">₹{totalGiftPending}</span> Worth of{' '}
        <span className="text-gold mx-2">24K Gold</span>
      </div>
      {/* <div className="text-sm font-light mt-2 text-center">
        These rewards will be added to your balance after the time period
      </div> */}
      <div className="flex-col mt-4 text-sm items-center justify-center w-full max-h-[50vh] overflow-auto">
        {totalGiftPendingList?.map((gift, index) => (
          <div key={index} className="flex-col my-2">
            <div className="mb-4 w-[100%] items-center font-light text-center justify-center">
              {gift.display}
              {/* <div className="font-medium w-[25%]">
              {formatMoney(Number(gift.value))}
            </div>
            <div className="block w-[50%] max-w-[50%] break-words">
              {gift.reason}
            </div>
            <div className="w-[25%] justify-end">{gift.creditDate}</div> */}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  )
}

export { GiftInfo }
