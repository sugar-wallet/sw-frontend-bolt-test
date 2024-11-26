import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import styles from './styles.module.css'

interface ICountDown {
  duration?: number
  pingInterval?: number
  size?: number
  callback?: () => void
  onComplete?: () => void
}

const RenderTime = ({ remainingTime }: { remainingTime: number }) => {
  const currentTime = React.useRef(remainingTime)
  const prevTime = React.useRef<number | null>(null)
  const isNewTimeFirstTick = React.useRef(false)
  const [, setOneLastRerender] = React.useState(0)

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true
    prevTime.current = currentTime.current
    currentTime.current = remainingTime
  } else {
    isNewTimeFirstTick.current = false
  }

  // force one last re-render when the time is over to trigger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1)
    }, 20)
  }

  const isTimeUp = isNewTimeFirstTick.current

  return (
    <div className={styles.timewrapper}>
      <div className={styles.text}>Please wait</div>
      <div
        key={remainingTime}
        className={`${styles.time} ${isTimeUp ? styles.up : null}`}
      >
        {remainingTime}
      </div>{' '}
      <div className={styles.text}>
        {remainingTime === 1 ? 'second' : 'seconds'}
      </div>
    </div>
  )
}

const CountDown = ({
  duration = 59,
  pingInterval = 10,
  size = 150,
  callback = () => null,
  onComplete = () => null
}: ICountDown) => {
  const onUpdate = (remainingTime: number) => {
    if (
      remainingTime > 0 &&
      pingInterval > 0 &&
      remainingTime >= pingInterval &&
      remainingTime % pingInterval === 0
    ) {
      callback()
    }
  }

  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      size={size}
      colors={['#000000', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[10, 6, 3, 0]}
      onUpdate={onUpdate}
      onComplete={onComplete}
    >
      {RenderTime}
    </CountdownCircleTimer>
  )
}

export { CountDown }
