import { createContext, useState } from 'react'

interface CreateNewCycleData {
  task: string
  minutesAmount: number
}

interface CycleTask {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesTaskType {
  cycleTask: CycleTask[]
  activeCycleTask: CycleTask | undefined
  activeCycleTaskId: string | null
  amountSecondsPassed: number
  markCurrentCycleTaskAsFinished: () => void
  resetCurrentCycleTask: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateNewCycleData) => void
  interruptCycle: () => void
}

interface CyclesTaskProvaiderProps {
  children: React.ReactNode
}

export const CyclesTaskContext = createContext({} as CyclesTaskType)

export function CyclesTaskProvaider({ children }: CyclesTaskProvaiderProps) {
  const [cycleTask, setCycleTask] = useState<CycleTask[]>([])
  const [activeCycleTaskId, setActiveCycleTaskId] = useState<string | null>(
    null,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycleTask = cycleTask.find(
    (cycleTask) => cycleTask.id === activeCycleTaskId,
  )

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function resetCurrentCycleTask() {
    setActiveCycleTaskId(null)
  }

  function markCurrentCycleTaskAsFinished() {
    setCycleTask((cycleTask) =>
      cycleTask.map((cycle) => {
        if (cycle.id === activeCycleTaskId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function createNewCycle(data: CreateNewCycleData) {
    const id = String(new Date().getTime())

    const newCycleTask: CycleTask = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycleTask((cycleTask) => [...cycleTask, newCycleTask])
    setActiveCycleTaskId(id)
    setAmountSecondsPassed(0)
    // reset()
  }

  function interruptCycle() {
    setCycleTask((cycleTask) =>
      cycleTask.map((cycle) => {
        if (cycle.id === activeCycleTaskId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleTaskId(null)
  }

  return (
    <CyclesTaskContext.Provider
      value={{
        cycleTask,
        activeCycleTask,
        activeCycleTaskId,
        amountSecondsPassed,
        markCurrentCycleTaskAsFinished,
        resetCurrentCycleTask,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesTaskContext.Provider>
  )
}
