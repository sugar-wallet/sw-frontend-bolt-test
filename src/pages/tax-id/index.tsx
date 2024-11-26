import React, { useEffect } from 'react'

import { PosthogEvents } from '@constants'
import { TaxIdComponent } from 'components'
import { emitTrackEvent } from 'helpers/events'
import { PrimaryLayout } from 'layouts'

const TaxId = () => {
  useEffect(() => {
    emitTrackEvent(PosthogEvents.TaxIdPageViewed)
  }, [])

  return (
    <PrimaryLayout>
      <TaxIdComponent />
    </PrimaryLayout>
  )
}

export default TaxId
