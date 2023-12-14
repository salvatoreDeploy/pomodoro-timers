import { useContext, useEffect } from 'react'
import { CountDownContainer, SeparatorContainer } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesTaskContext } from '../../../../context/CyclesTaskContext'

export function CountDown() {
  const {
    activeCycleTask,
    activeCycleTaskId,
    amountSecondsPassed,
    markCurrentCycleTaskAsFinished,
    setSecondsPassed,
  } = useContext(CyclesTaskContext)

  const totalSeconds = activeCycleTask ? activeCycleTask.minutesAmount * 60 : 0

  const secondsCurrents = activeCycleTask
    ? totalSeconds - amountSecondsPassed
    : 0

  const minutesAmount = Math.floor(secondsCurrents / 60)
  const secondsAmount = secondsCurrents % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    document.title = `${minutes}:${seconds}`
  }, [minutes, seconds])

  useEffect(() => {
    let interval: number

    if (activeCycleTask) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycleTask.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleTaskAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycleTask,
    totalSeconds,
    activeCycleTaskId,
    markCurrentCycleTaskAsFinished,
    setSecondsPassed,
  ])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorContainer>:</SeparatorContainer>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
