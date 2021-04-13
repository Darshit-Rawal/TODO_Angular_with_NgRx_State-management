import { Action } from "@ngrx/store";
import { TaskModel } from "../models/task.model";
import * as TaskActions from './task.actions';

export interface State {
  tasks: TaskModel[],
  editedTask: TaskModel,
  editedTaskIndex: number
}

const InitialState: State = {
  tasks:[
    new TaskModel(
      1,
      'Example 1',
      false
    ),
    new TaskModel(
      2,
      'Example 2',
      true
    ),
    new TaskModel(
      3,
      'Example 3',
      false
    ),
    new TaskModel(
      4,
      'Example 4',
      true
    ),
    new TaskModel(
      5,
      'Example 5',
      false
    )
  ],
  editedTask: null,
  editedTaskIndex: -1
};

export function TaskReducer(
  state: State = InitialState,
  action: TaskActions.TaskActions): State{
    switch(action.type){
      case TaskActions.ADD_TASK:
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case TaskActions.UPDATE_TASK:
        const taskId = state.tasks.findIndex((obj => obj.id == state.editedTaskIndex))
        const task = state.tasks[taskId];
        let obj = {...action.payload}
        obj.id = state.editedTaskIndex;
        const updatedTask = {
          ...task,
          ...obj
        }
        const tasks = [...state.tasks];
        tasks[taskId] = updatedTask;
        return {
          ...state,
          tasks: tasks,
          editedTask: null,
          editedTaskIndex: -1
        }
      case TaskActions.DELETE_TASK:
        const oldTasks = [...state.tasks];
        const deleteTaskId = state.tasks.findIndex((obj => obj.id == action.payload))
        oldTasks.splice(deleteTaskId, 1);
        return {
          ...state,
          tasks: oldTasks,
          editedTask: null,
          editedTaskIndex: -1
        }
      case TaskActions.START_EDIT:
        const tskId = state.tasks.findIndex((obj => obj.id == action.payload))
        const editedTask = {...state.tasks[tskId]};
        return {
          ...state,
          editedTask: editedTask,
          editedTaskIndex: action.payload
        }
      case TaskActions.START_CHANGE_STATUS:
        return {
          ...state,
          editedTaskIndex: action.payload
        }
      case TaskActions.STOP_EDIT:
        return {
          ...state,
          editedTask: null,
          editedTaskIndex: -1
        }
      default:
        return state;
    }
}
