/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'

import { FullScreenLoader } from '@sw-npm-packages/components'

const ImageComponent: React.FC<ImageProps> = (props) => {
  const [isImageLoaded, setImageLoaded] = useState(false)

  const onComplete = () => setImageLoaded(true)

  return (
    <>
      {!isImageLoaded && <FullScreenLoader />}
      <Image onLoadingComplete={onComplete} {...props} />
    </>
  )
}

export { ImageComponent }
