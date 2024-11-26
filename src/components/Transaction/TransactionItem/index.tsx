import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { ContainedButton, SubTitle } from '@sw-npm-packages/components'
import { Unit } from '@sw-npm-packages/constants'
import { CorrectIcon, ErrorV2Icon, PendingV2Icon } from '@sw-npm-packages/icons'
import {
  ITransactionItem,
  TransactionStatus,
  TransactionType
} from '@sw-npm-packages/types'
import { getFormattedDateString } from '@sw-npm-packages/utils'
import { CustomModal } from 'components'
import { computeGoldBalanceForUI, formatMoney } from 'helpers'

const TransactionItem = ({ data }: { data: ITransactionItem }) => {
  const [isOpen, setOpen] = useState(false)
  const t = useTranslations('TransactionsPage')
  const ct = useTranslations('Common')

  const isSuccess = data.transactionStatus === TransactionStatus.SUCCESS
  const isPending =
    data.transactionStatus === TransactionStatus.PENDING || !data.amount
  const isFailed = data.transactionStatus === TransactionStatus.FAILED

  const isBuy = data.transactionType === TransactionType.BUY_GOLD
  const isSell = data.transactionType === TransactionType.SELL_GOLD
  const isSubscription = data.isSubscription
  const { goldUnit, weightUnit } =
    computeGoldBalanceForUI(data.unit, Unit.G) || {}

  const handleItemClick = () => {
    if (isSell && isPending) {
      setOpen(true)
    }
  }

  const TransactionRow = () => {
    return (
      <>
        <div className="w-[10%]">
          {isSuccess ? (
            <CorrectIcon color="var(--success-green" size={24} />
          ) : isPending ? (
            <PendingV2Icon color="var(--gold)" />
          ) : isFailed ? (
            <ErrorV2Icon color="var(--red-2)" />
          ) : null}
        </div>
        <div className="justify-between w-[90%]">
          <div className="flex-col">
            <div
              className={`text-sm ${isSuccess ? 'text-black' : ''} font-medium`}
            >
              {isBuy ? ct('purchased') : ct('sold')}{' '}
              {isSubscription ? `: ${ct('autoInvest')}` : ''}
            </div>
            <div
              className={`text-xs ${
                isSuccess
                  ? 'text-success-green'
                  : isFailed
                  ? 'text-red-2'
                  : 'text-gold'
              } mt-2`}
            >
              {isSuccess
                ? ct('success')
                : isPending
                ? ct('pending')
                : ct('failed')}
            </div>
          </div>
          <div className="flex-col items-end">
            {data.amount && (
              <div
                className={`text-sm text-right ${isSuccess ? 'text-pink' : ''}`}
              >
                {`${formatMoney(data.amount)}`}
              </div>
            )}

            <div
              className={`text-xs mt-2 text-right ${
                isSuccess ? 'text-black' : ''
              }`}
            >
              {`${
                goldUnit
                  ? Number(goldUnit).toFixed(weightUnit === Unit.G ? 4 : 2)
                  : 0
              } ${weightUnit}`}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="w-full mt-4" onClick={handleItemClick}>
        <TransactionRow />
      </div>
      <CustomModal open={isOpen} onClose={() => setOpen(false)}>
        <div className="flex-1 flex-col">
          <div className="text-xs font-light mt-6">
            {getFormattedDateString(data.createdAt)}
          </div>
          <div className="w-full mt-4">
            <TransactionRow />
          </div>
          <SubTitle className="text-sm mt-6 mb-2 w-full text-center">
            {t('pendingSellTxn')}
          </SubTitle>
          <SubTitle className="text-sm font-light w-full text-center mb-6">
            {t('sellTAT')}
          </SubTitle>
          <div className="w-full flex-center">
            <ContainedButton
              className="w-[50%] btn-contained-black"
              onClick={() => setOpen(false)}
            >
              Close
            </ContainedButton>
          </div>
        </div>
      </CustomModal>
    </>
  )
}

export { TransactionItem }

// <div className="flex-col w-full px-4 text-light-gray">
//       <div className="flex-col w-full mt-4">
//         <Title className="text-xs font-light text-black">Today</Title>
//         <div className="w-full mt-4">
//           <div className="w-[10%]">
//             <PendingV2Icon color="var(--gold)" />
//           </div>
//           <div className="justify-between w-[90%]">
//             <div className="flex-col">
//               <div className="text-sm font-medium">Sold</div>
//               <div className="text-xs text-gold mt-2">Pending</div>
//             </div>
//             <div className="flex-col items-end">
//               <div className="text-sm text-right">+$100.00</div>
//               <div className="text-xs mt-2 text-right">1000 mg</div>
//             </div>
//           </div>
//         </div>
//         <hr className="my-2" />
//       </div>

//       <div className="flex-col w-full mt-4">
//         <Title className="text-xs font-light text-black">Yesterday</Title>
//         <div className="w-full mt-4">
//           <div className="w-[10%]">
//             <CorrectIcon color="var(--success-green" size={24} />
//           </div>
//           <div className="justify-between w-[90%]">
//             <div className="flex-col">
//               <div className="text-sm text-black font-medium">Sold</div>
//               <div className="text-xs text-success-green mt-2">Success</div>
//             </div>
//             <div className="flex-col items-end">
//               <div className="text-sm text-right text-pink">+$100.00</div>
//               <div className="text-xs mt-2 text-right text-black">1000 mg</div>
//             </div>
//           </div>
//         </div>
//         <hr className="my-2" />

//         <div className="w-full mt-4">
//           <div className="w-[10%]">
//             <ErrorV2Icon color="var(--red-2)" />
//           </div>
//           <div className="justify-between w-[90%]">
//             <div className="flex-col">
//               <div className="text-sm font-medium">Purchased</div>
//               <div className="text-xs text-red-2 mt-2">Failed</div>
//             </div>
//             <div className="flex-col items-end">
//               <div className="text-sm text-right">-$100.00</div>
//               <div className="text-xs mt-2 text-right">45 mg</div>
//             </div>
//           </div>
//         </div>
//         <hr className="my-2" />
//       </div>

//       <div className="flex-col w-full mt-4">
//         <Title className="text-xs font-light text-black">Tue 10 July</Title>
//         <div className="w-full mt-4">
//           <div className="w-[10%]">
//             <CorrectIcon color="var(--success-green" size={24} />
//           </div>
//           <div className="justify-between w-[90%]">
//             <div className="flex-col">
//               <div className="text-sm text-black font-medium">
//                 Purchased: Auto-Invest
//               </div>
//               <div className="text-xs mt-2">
//                 <span className="text-success-green mr-2">Success</span>
//                 Every Week
//               </div>
//             </div>
//             <div className="flex-col items-end">
//               <div className="text-sm text-right text-black">-$100.00</div>
//               <div className="text-xs mt-2 text-right text-black">50 mg</div>
//             </div>
//           </div>
//         </div>
//         <hr className="my-2" />
//       </div>
//     </div>
