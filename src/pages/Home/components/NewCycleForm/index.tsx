import { useFormContext } from 'react-hook-form'
import { FormContainer, MinuteAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesTaskContext } from '../..'

export function NewCycleForm() {
  const { activeCycleTask } = useContext(CyclesTaskContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestion"
        placeholder="De um nome a sua Tarefa"
        disabled={!!activeCycleTask}
        {...register('task')}
      />

      <datalist id="task-suggestion">
        <option value="Task 1" />
        <option value="Task 2" />
        <option value="Task 3" />
        <option value="Task 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinuteAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        disabled={!!activeCycleTask}
        /* max={60} */
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
