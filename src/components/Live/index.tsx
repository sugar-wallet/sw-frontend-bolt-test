import { useTranslations } from 'next-intl'
import React from 'react'

import { Title } from '@sw-npm-packages/components'
import { LiveIcon } from '@sw-npm-packages/icons'

const Live = () => {
  const t = useTranslations('SellPage')
  return (
    <div className="items-center animate-pulse-slow">
      <Title className="text-pink text-sm font-normal mr-1">{t('live')}</Title>
      <LiveIcon size={16} color="var(--pink)" />
    </div>
  )
}

export { Live }
