import { ContainedButton } from '@sw-npm-packages/components'
import { CloseIcon } from '@sw-npm-packages/icons'
import { useTranslations } from 'next-intl'
import React from 'react'

const ReferralInviteCardDetailsNz = ({ onClose, navigateToReferral }: { onClose: () => void, navigateToReferral: ()=> void }) => {
  const t = useTranslations('ReferInviteModal')
  return (
    <div className="flex-col text-dark-gray-5E flex-1">
      {/* <div className="justify-between">
        <div></div> */}
      <CloseIcon className="-mt-4 absolute top-4 right-2" onClick={onClose} />
      {/* </div> */}

      <div className={`flex-col [&>div]:mt-1 gap-2`}>
        <div className="text-lg justify-center gap-4 flex-col">
          <span className="text-black font-semibold text-center">
            {t('projectedEarnings')}
          </span>
          <div className="gap-3 flex-col">
            <span
              className="text-sm font-normal"
              style={{ color: 'var(--black)' }}
            >
              {t('revealProjectedEarnings')}
            </span>
            <div className="gap-1 flex-col">
              <span
                className="text-sm font-normal"
                style={{ color: 'var(--black)' }}
              >
                {t('referPeopleSugar')}
              </span>
              <span
                className="text-sm font-normal"
                style={{ color: 'var(--black)' }}
              >
                {t('makeFirstDeposit')}
              </span>
              <span
                className="text-sm font-normal"
                style={{ color: 'var(--black)' }}
              >
                {t('potentialEarnings')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-14 flex-center gap-2">
        <ContainedButton
          className="btn-contained-black w-fit px-5"
          onClick={() => navigateToReferral()}
        >
          {t('makeFirstReferral')}
        </ContainedButton>
      </div>
    </div>
  )
}

export default ReferralInviteCardDetailsNz
