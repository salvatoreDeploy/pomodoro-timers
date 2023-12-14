import { CycleTask } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLETASK = 'ADD_NEW_CYCLETASK',
  ITERRUPT_CURRENT_CYCLETASK = 'ITERRUPT_CURRENT_CYCLETASK',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleTaskAction(newCycleTask: CycleTask) {
  return {
    type: ActionTypes.ADD_NEW_CYCLETASK,
    payload: {
      newCycleTask,
    },
  }
}

export function markCurrentCycleTaskAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function interruptCycleTaskAction() {
  return {
    type: ActionTypes.ITERRUPT_CURRENT_CYCLETASK,
  }
}
