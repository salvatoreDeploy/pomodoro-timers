import { createContext, useReducer, useState } from 'react'
import { CycleTask, cycleTaskReducer } from '../reducers/cyclesTask'

interface CreateNewCycleData {
  task: string
  minutesAmount: number
}

interface CyclesTaskType {
  cycleTask: CycleTask[]
  activeCycleTask: CycleTask | undefined
  activeCycleTaskId: string | null
  amountSecondsPassed: number
  markCurrentCycleTaskAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateNewCycleData) => void
  interruptCycle: () => void
}

interface CyclesTaskProvaiderProps {
  children: React.ReactNode
}

export const CyclesTaskContext = createContext({} as CyclesTaskType)

export function CyclesTaskProvaider({ children }: CyclesTaskProvaiderProps) {
  const [cycleTaskState, dispatch] = useReducer(cycleTaskReducer, {
    cycleTask: [],
    activeCycleTaskId: null,
  })

  const { cycleTask, activeCycleTaskId } = cycleTaskState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycleTask = cycleTask.find(
    (cycleTask) => cycleTask.id === activeCycleTaskId,
  )

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleTaskAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleTaskId,
      },
    })
  }

  function createNewCycle(data: CreateNewCycleData) {
    const id = String(new Date().getTime())

    const newCycleTask: CycleTask = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLETASK',
      payload: {
        newCycleTask,
      },
    })

    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLETASK',
      payload: {
        activeCycleTaskId,
      },
    })
  }

  return (
    <CyclesTaskContext.Provider
      value={{
        cycleTask,
        activeCycleTask,
        activeCycleTaskId,
        amountSecondsPassed,
        markCurrentCycleTaskAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesTaskContext.Provider>
  )
}
