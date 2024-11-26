import React from 'react'

const JourneyInfo = () => {
  return (
    <>
      <div className="text-2xl font-semibold text-center flex-center w-full">
        Journey to Half a Gram
      </div>
      <div className="text-sm mt-3  text-center flex-center w-full">
        Reach half a gram of transactions and redeem a voucher for physical
        gold!
      </div>
      <div className="text-sm font-light w-full mt-6 rounded-md bg-off-white shadow-md p-4 text-center">
        Once you’ve reached 500mg of gold, we’ll give you a voucher to redeem
        this gold from any of our physical gold stores*.
      </div>
      <div className="mt-6 font-semibold">You can reach half a gram by</div>
      <ul className="list-disc mt-3 text-sm ml-6">
        <li>Auto-investing</li>
        <li>Buying gold</li>
        <li>Auto-investing</li>
      </ul>
      <div className="text-pink font-semibold mt-6">Be Warned</div>
      <div className="text-sm mt-4">
        You’ll lose all progress and your one-off physical gold voucher if you:
      </div>
      <ul className="list-disc mt-3 text-sm ml-6">
        <li>Withdraw/Sell your gold</li>
        <li>Cancel your auto-investments</li>
      </ul>

      <div className="text-sm font-light mt-8">
        *Physical stores include Store Name Franchise Here across India.
      </div>
    </>
  )
}

export default JourneyInfo
