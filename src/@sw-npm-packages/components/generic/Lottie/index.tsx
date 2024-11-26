import LottieComponent from 'lottie-react'
import React from 'react'

import { IKeyValuePair } from '@sw-npm-packages/types'

const defaultOptions = {
  loop: true
}

interface ILottie {
  animationData: unknown
  options?: IKeyValuePair<string | boolean | number>
}

const Lottie: React.FC<ILottie> = ({ animationData, options = {} }) => {
  return (
    <LottieComponent
      animationData={animationData}
      {...defaultOptions}
      {...options}
    />
  )
}

export { Lottie }
