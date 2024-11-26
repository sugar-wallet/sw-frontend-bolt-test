import React, { useEffect } from 'react'

import { navigationPaths } from 'config'
import { navigate } from 'helpers/navigation'

const NotFoundPage = () => {
  useEffect(() => {
    navigate(navigationPaths.home)
  }, [])
  return <div></div>
}

export default NotFoundPage
