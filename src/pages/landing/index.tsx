import React, { useEffect } from 'react'

import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const Landing = () => {
  useEffect(() => {
    navigate(navigationPaths.onboarding)
  }, [])
  return <div></div>
}

export default Landing
