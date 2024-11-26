import React from 'react'
import { useTimer } from 'react-timer-hook'

interface IProps {
  onTimerStop: () => void
}

const ReferralTimer = ({ onTimerStop }: IProps) => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + (60 * 1 - 1)) // 1 minute timer
  const { seconds, minutes } = useTimer({
    expiryTimestamp: time,
    onExpire: onTimerStop
  })

  return (
    <div className="flex-col w-full flex-center mb-4">
      <div className="text-[4.5rem] font-medium text-dark-gray-5E">
        0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  )
}

export { ReferralTimer }
