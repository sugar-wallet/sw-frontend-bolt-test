import React from 'react'
import ScratchCardComponent from 'react-scratchcard-v2'

interface ScratchCardProps {
  width: number
  height: number
  image: string
  finishPercent: number
  rewardComponent?: React.ReactNode
  onComplete: () => void
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  width,
  height,
  image,
  finishPercent,
  rewardComponent,
  onComplete
}) => {
  return (
    <ScratchCardComponent
      width={width}
      height={height}
      image={image}
      finishPercent={finishPercent}
      onComplete={onComplete}
    >
      {rewardComponent}
    </ScratchCardComponent>
  )
}

export { ScratchCard }
