/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CycleTask {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleTaskState {
  cycleTask: CycleTask[]
  activeCycleTaskId: string | null
}

export enum ActionTypes {
  ADD_NEW_CYCLETASK = 'ADD_NEW_CYCLETASK',
  ITERRUPT_CURRENT_CYCLETASK = 'ITERRUPT_CURRENT_CYCLETASK',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function cycleTaskReducer(state: CycleTaskState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLETASK:
      return {
        ...state,
        cycleTask: [...state.cycleTask, action.payload.newCycleTask],
        activeCycleTaskId: action.payload.newCycleTask.id,
      }
    case ActionTypes.ITERRUPT_CURRENT_CYCLETASK:
      return {
        ...state,
        cycleTask: state.cycleTask.map((cycle) => {
          if (cycle.id === state.activeCycleTaskId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleTaskId: null,
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycleTask: state.cycleTask.map((cycle) => {
          if (cycle.id === state.activeCycleTaskId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleTaskId: null,
      }
    default:
      return state
  }
}
