import { useTranslations } from 'next-intl'
import React from 'react'

import { DATE_TIME_FORMATS } from '@sw-npm-packages/constants'
import { CloseIcon } from '@sw-npm-packages/icons'
import { Dayjs } from '@sw-npm-packages/utils'
import { InvestTnCContent } from 'components'
import { closeTab } from 'helpers/navigation'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { HeaderVariant } from 'types'

const InvestTermsAndConditions = () => {
  const t = useTranslations('AutoInvestPage')

  const onClose = () => closeTab()

  return (
    <BottomNavigationLayout>
      <PrimaryLayout headerVariant={HeaderVariant.SECONDARY} title="mo">
        <div className="flex-1 flex-col items-center">
          <div className="flex-col items-center pb-16">
            <div className="h-1 bg-semi-gray w-20 rounded-lg absolute top-14 z-10"></div>
            <CloseIcon
              onClick={onClose}
              className="absolute top-14 z-20 right-4"
            />
            <h3 className=" w-[90%] text-center">{t('termsAndConditions')}</h3>
            <div className="mt-2 text-xs text-center">
              {t('lastUpdatedAt', {
                dateTime: Dayjs().format(DATE_TIME_FORMATS.dateTime)
              })}
            </div>
            <InvestTnCContent />
          </div>
        </div>
      </PrimaryLayout>
    </BottomNavigationLayout>
  )
}

export default InvestTermsAndConditions
