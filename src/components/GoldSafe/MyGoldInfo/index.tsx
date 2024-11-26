import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { fetchUserBalance } from 'config'
import {
  computeGoldBalance,
  computeGoldBalanceForUI,
  formatMoney
} from 'helpers'

const MyGoldInfo = () => {
  const t = useTranslations('MyCollectionPage')
  const { data } = useQuery(fetchUserBalance())
  const {
    amount,
    unit: rawUnit,
    weightUnits: rawWeightUnit,
    amount_bought,
    amount_sold,
    sell_price
  }: any = data || {}

  const balance:number = rawUnit * sell_price;
  const returnPercent = ((balance + amount_sold - amount_bought) / amount_bought) * 100
  const { goldUnit: unit, weightUnit: weightUnits } =
    computeGoldBalanceForUI(rawUnit, rawWeightUnit) || {}
  const disposits: any = Number(amount_bought).toFixed(2);
  const withdrawal: any = Number(amount_sold).toFixed(2);
  return (
    <div className=" text-dark-gray-5E justify-between w-full mt-2 rounded-lg bg-white shadow-md p-7 gap-5">
      <div className="d-flex flex-col gap-4">
        <div className="flex-col">
          <div className="text-sm text-pink whitespace-nowrap">{t('youOwn')}</div>
          <div className="mt-2">
          <div className="text-sm" style={{color:"var(--black)"}}>{unit}{weightUnits}</div>
            {/* {t.rich('unitOfGold', {
              unit: computeGoldBalance(unit, weightUnits),
              divOne: (content) => <div className="text-xl">{content}</div>,
              divTwo: (content) => (
                <div className="ml-2 mt-2 text-xs">{content}</div>
              )
            })} */}
          </div>
        </div>
        
        <div className="flex-col">
          <div className="text-sm text-pink">{t('return')}</div>
          <div className="text-sm mt-2" style={{color:"var(--black)"}}>{returnPercent.toFixed(2)}%</div>
        </div>
      </div>
      <div className="balance-card-shadow text-dark-gray-5E justify-center items-center w-full rounded-3xl bg-white shadow-md p-4 ">
        <div className="flex-col items-center relative">
          <div className="text-Dark text-lg font-semibold" style={{color:"var(--black)"}}>{t('balance')}</div>
          <div className="z-10 mt-2 text-lg" style={{color:"var(--black)"}}>{formatMoney(Number(balance))}</div>
          <div style={{backgroundColor:"rgba(255, 214, 218, 0.60)"}} className='w-full bottom-0 z-0 h-1.5 rounded-md absolute'></div>
        </div>
      </div>
      <div className="d-flex flex-col gap-4">
      <div className="flex-col">
          <div className="text-sm text-pink">{t('totalDeposit')}</div>
          <div className="mt-2 text-sm" style={{color:"var(--black)"}}>{formatMoney(disposits)}</div>
        </div>
        <div className="flex-col">
          <div className="text-sm text-pink">{t('totalWithdrawal')}</div>
          <div className="mt-2 text-sm" style={{color:"var(--black)"}}>{formatMoney(withdrawal)}</div>
        </div>
        {/* <div className="flex-col">
          <div className="flex-col">
            <div className="text-sm text-pink">{t('approxValue')}</div>
            <div className="mt-2 text-sm">{formatMoney(Number(amount))}</div>
          </div>
          
        </div> */}
      </div>
    </div>
  )
}

export { MyGoldInfo }
