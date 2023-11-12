/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { createContext, useState } from 'react'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface CycleTask {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesTaskType {
  activeCycleTask: CycleTask | undefined
  activeCycleTaskId: string | null
  amountSecondsPassed: number
  markCurrentCycleTaskAsFinished: () => void
  resetCurrentCycleTask: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesTaskContext = createContext({} as CyclesTaskType)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no minimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos.'),
})

type CreateNewCycleData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycleTask, setCycleTask] = useState<CycleTask[]>([])
  const [activeCycleTaskId, setActiveCycleTaskId] = useState<string | null>(
    null,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleTaskForm = useForm<CreateNewCycleData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleTaskForm

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

  function resetCurrentCycleTask() {
    setActiveCycleTaskId(null)
  }

  function handleCreateNewCycle(data: CreateNewCycleData) {
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
    reset()
  }

  function handleInterruptCycle() {
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

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  const activeCycleTask = cycleTask.find(
    (cycleTask) => cycleTask.id === activeCycleTaskId,
  )

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesTaskContext.Provider
          value={{
            activeCycleTask,
            activeCycleTaskId,
            amountSecondsPassed,
            markCurrentCycleTaskAsFinished,
            resetCurrentCycleTask,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleTaskForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CyclesTaskContext.Provider>

        {activeCycleTask ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Imterromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
