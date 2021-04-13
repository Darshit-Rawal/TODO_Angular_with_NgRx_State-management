import { Action } from '@ngrx/store';
import { TaskModel } from '../models/task.model';

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const START_EDIT = 'START_EDIT';
export const START_CHANGE_STATUS = 'START_CHANGE_STATUS';
export const STOP_EDIT = 'STOP_EDIT';

export class AddTask implements Action {
  readonly type = ADD_TASK;
  constructor(public payload: TaskModel) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;
  constructor(public payload: TaskModel) {}
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;
  constructor(public payload: number) {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StartChangeStatus implements Action {
  readonly type = START_CHANGE_STATUS;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type TaskActions =
  | AddTask
  | UpdateTask
  | DeleteTask
  | StartEdit
  | StopEdit
  | StartChangeStatus;
