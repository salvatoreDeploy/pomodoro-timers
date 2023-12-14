/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionTypes } from './actions'
import { produce } from 'immer'

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

export function cycleTaskReducer(state: CycleTaskState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLETASK:
      /* return {
        ...state,
        cycleTask: [...state.cycleTask, action.payload.newCycleTask],
        activeCycleTaskId: action.payload.newCycleTask.id,
      } */

      return produce(state, (draft) => {
        draft.cycleTask.push(action.payload.newCycleTask)
        draft.activeCycleTaskId = action.payload.newCycleTask.id
      })

    case ActionTypes.ITERRUPT_CURRENT_CYCLETASK: {
      /* return {
        ...state,
        cycleTask: state.cycleTask.map((cycle) => {
          if (cycle.id === state.activeCycleTaskId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleTaskId: null,
      } */

      const currentCycleTaskIndex = state.cycleTask.findIndex((cycle) => {
        return cycle.id === state.activeCycleTaskId
      })

      if (currentCycleTaskIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycleTask[currentCycleTaskIndex].interruptedDate = new Date()
        draft.activeCycleTaskId = null
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      /* return {
        ...state,
        cycleTask: state.cycleTask.map((cycle) => {
          if (cycle.id === state.activeCycleTaskId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleTaskId: null,
      } */

      const currentCycleTaskIndex = state.cycleTask.findIndex((cycle) => {
        return cycle.id === state.activeCycleTaskId
      })

      if (currentCycleTaskIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycleTask[currentCycleTaskIndex].finishedDate = new Date()
        draft.activeCycleTaskId = null
      })
    }

    default:
      return state
  }
}
