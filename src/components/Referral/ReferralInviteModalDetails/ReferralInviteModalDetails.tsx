import { ContainedButton } from '@sw-npm-packages/components'
import { CloseIcon } from '@sw-npm-packages/icons'
import { useTranslations } from 'next-intl'
import React from 'react'

const ReferralInviteModalDetails = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslations('ReferInviteModal')
  return (
    <div className="flex-col text-dark-gray-5E flex-1">
      {/* <div className="justify-between">
        <div></div> */}
        <CloseIcon className="-mt-4 absolute top-4 right-2" onClick={onClose} />
      {/* </div> */}

      <div className={`flex-col [&>div]:mt-1 gap-2`}>
        <div className="text-lg justify-center gap-1">
          <span className="text-pink font-semibold">$203 </span>{' '}
          <span className="text-black font-semibold"> {t('goldCreditTotal')}</span>
        </div>
        <span className="text-sm text-black text-center font-light">
            {t('rewardsAddedAfterTimePeriod')}
        </span>

        <div className="justify-center items-center flex-col">
          <div className="flex-row justify-between w-4/5">
            <div className="gap-3 flex-row">
              <span className='text-sm font-medium' style={{color:'var(--black)'}}>₹101</span>
              <span className='text-sm font-normal' style={{color:'var(--black)'}}>{t('diwaliGift')}</span>
            </div>
            <span className='text-sm font-normal' style={{color:'var(--semi-gray)'}}>1d</span>
          </div>
          <div className="flex-row justify-between w-4/5">
            <div className="gap-3 flex-row">
              <span className='text-sm font-medium' style={{color:'var(--black)'}}>₹51</span>
              <span className='text-sm font-normal' style={{color:'var(--black)'}}>{t('friendReferral')}</span>
            </div>
            <span className='text-sm font-normal' style={{color:'var(--black)'}}>59d</span>
          </div>
          <div className="flex-row justify-between w-4/5">
            <div className="gap-3 flex-row">
              <span className='text-sm font-medium' style={{color:'var(--black)'}}>₹51</span>
              <span className='text-sm font-normal' style={{color:'var(--black)'}}>{t('friendReferral')}</span>
            </div>
            <span className='text-sm font-normal' style={{color:'var(--black)'}}>60d</span>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex-center gap-2">
        <ContainedButton
          className="btn-outlined-black w-[60%]"
          //   onClick={() => onClose()}
        >
          {t('inviteFriends')}
        </ContainedButton>
        <ContainedButton
          className="btn-contained-black w-[60%]"
          onClick={() => onClose()}
        >
          {t('close')}
        </ContainedButton>
      </div>
    </div>
  )
}

export default ReferralInviteModalDetails
