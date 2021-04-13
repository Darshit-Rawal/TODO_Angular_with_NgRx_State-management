import { ActionReducerMap } from '@ngrx/store';
import * as fromTasks from './store/task.reducers';

export interface AppState {
  tasks: fromTasks.State
};

export const Reducer: ActionReducerMap<AppState> = {
  tasks: fromTasks.TaskReducer
};
