import { useTranslations } from 'next-intl'
import React from 'react'

import { Title } from '@sw-npm-packages/components'

const JourneyTitle = () => {
  const t = useTranslations('Common')
  return (
    <div>
      <Title className="text-sm font-semibold mb-6 mr-1 mt-1">
        {t('journeyToHalfAGram')}
      </Title>
      {/* <div>
        <InfoIcon color="var(--semi-gray)" />
      </div> */}
    </div>
  )
}

export { JourneyTitle }
