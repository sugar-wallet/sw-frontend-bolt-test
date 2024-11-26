import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { ChevronIcon, CloseIcon, FileIcon } from '@sw-npm-packages/icons'
import { openTab } from 'helpers/navigation'

import { goldInfoFiles } from './data'
import { ContainedButton } from '@sw-npm-packages/components'

interface CollapseIndices {
  first: boolean
  second: boolean
}

const GoldProductDetailsModal = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations('MyCollectionPage')
  const [isOpen, setOpen] = useState<CollapseIndices>({
    first: true,
    second: true
  })

  const toggleAccordion = (key: 'first' | 'second') => {
    setOpen({
      ...isOpen,
      [key]: !isOpen[key]
    })
  }

  const openUrl = (url: string) => {
    openTab(url)
  }

  return (
    <div className="flex-col text-dark-gray-5E flex-1 justify-between">
      <div className='flex-col'>
        <div className="justify-center">
          <div className="text-lg text-semi-gray font-semibold mb-4 mt-3">
            {t('productDetails')}
          </div>
          {/* <CloseIcon className="-mt-4" onClick={onClose} /> */}
        </div>

        <div className="font-semibold mb-2">{t('bullionStarGoldBar')}</div>
        {/* <div className="mt-2">
        <div className="text-sm">Purity</div>
        <div className="text-sm font-light ml-8">.9999</div>
      </div> */}
        <div
          className="justify-between mt-2"
          onClick={() => toggleAccordion('first')}
        >
          <div className="text-lg text-semi-gray font-semibold">
            {t('productHighlights')}
          </div>
          <span
            className={`transform transition-transform ${
              isOpen.first ? 'rotate-0' : '-rotate-180'
            }`}
          >
            <ChevronIcon />
          </span>
        </div>
        <div className={`w-full ${isOpen.first ? '' : 'hidden'}`}>
          <div className="flex-col mt-2 text-sm w-[50%] [&>div]:mt-2">
            <div className="text-black">{t('countryOrigin')}</div>
            <div className="text-black">{t('manufacturer')}</div>
            <div className="text-black" style={{ marginTop: '1rem' }}>
              {t('size')}
            </div>
            <div className="text-black">{t('weight')}</div>
            <div className="text-black">{t('purity')}</div>
            <div className="text-black" style={{ marginTop: '1rem' }}>
              {t('insurer')}
            </div>
            <div className="text-black">{t('auditor')}</div>
            <div className="text-black">{t('dealer')}</div>
          </div>
          <div className="flex-col text-sm font-light mt-2 w-[70%] [&>div]:mt-2">
            <div>{t('countryOriginValue')}</div>
            <div>{t('manufacturerValue')}</div>
            <div style={{ marginTop: '1rem' }}>{t('sizeValue')}</div>
            <div>{t('weightValue')}</div>
            <div>{t('purityValue')}</div>
            <div style={{ marginTop: '1rem' }}>{t('insurerValue')}</div>
            <div>{t('auditorValue')}</div>
            <div>{t('dealerValue')}</div>
          </div>
        </div>
        <div
          className="justify-between text-dark-gray-5E mt-6"
          onClick={() => toggleAccordion('second')}
        >
          <div className="text-lg text-semi-gray font-semibold">
            {t('proofDocuments')}
          </div>

          <span
            className={`transform transition-transform ${
              isOpen.second ? 'rotate-0' : '-rotate-180'
            }`}
          >
            <ChevronIcon />
          </span>
        </div>
        <div
          className={`flex-col mt-2 [&>div]:mt-1 ${
            isOpen.second ? '' : 'hidden'
          }`}
        >
          {goldInfoFiles.map((file) => (
            <div key={file.url}>
              <FileIcon color="var(--dark-gray-5E)" />
              <div
                className="text-sm text-black"
                onClick={() => openUrl(file.url)}
              >
                {t(file.title)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full my-10 flex-center">
        <ContainedButton
          className="btn-contained-black mt-5 w-[50%]"
          onClick={() => onClose()}
        >
          Close
        </ContainedButton>
      </div>
    </div>
  )
}

export { GoldProductDetailsModal }
