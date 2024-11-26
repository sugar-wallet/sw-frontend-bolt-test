import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { ContainedButton, FullScreenLoader } from '@sw-npm-packages/components'
import {
  GoldInfoLogos,
  GoldPlateSlider,
  GoldProductDetailsModal,
  MyGoldInfo
} from 'components'
import TermsAndConditionModal from 'components/TermsAndConditionModal'
import { fetchUserBalance } from 'config'
import { BottomNavigationLayout, PrimaryLayout } from 'layouts'
import { HeaderVariant } from 'types'

const MyGold = () => {
  const t = useTranslations('MyCollectionPage')
  const [isModalOpen, setModalOpen] = useState(false)
  const { isLoading } = useQuery(fetchUserBalance())
  if (isLoading) return <FullScreenLoader />
  return (
    <BottomNavigationLayout>
      <PrimaryLayout
        headerVariant={HeaderVariant.TERTIARY}
        title={t('yourCollection')}
      >
        <div className="flex-col w-full pb-20">
          <MyGoldInfo />
          <GoldPlateSlider />
          <GoldInfoLogos />
          <div className="w-full my-8 flex-center">
            <ContainedButton
              className="btn-contained-black w-[50%]"
              onClick={() => setModalOpen(true)}
            >
              {t('learnMore')}
            </ContainedButton>
          </div>
        </div>
      </PrimaryLayout>
      {/* <CustomModal open={isModalOpen} onClose={() => setModalOpen(false)}> */}
      {/* <GoldProductDetailsModal onClose={() => setModalOpen(false)} /> */}
      <TermsAndConditionModal
        displayModal={isModalOpen}
        setDisplayModal={() => setModalOpen(false)}
      >
        <GoldProductDetailsModal onClose={() => setModalOpen(false)} />
      </TermsAndConditionModal>
      {/* </CustomModal> */}
    </BottomNavigationLayout>
  )
}

export default MyGold
