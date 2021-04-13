import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskModel } from '../models/task.model';

import * as TaskActions from '../store/task.actions';
import * as fromTasks from '../store/task.reducers';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  tasks: TaskModel[];
  task:string;
  taskEdit:TaskModel;
  taskIndex: number;
  editMode:boolean;
  index: number;

  constructor(
    private store: Store<fromTasks.State>
  ) { }

  ngOnInit(): void {
    this.getTask();
    this.store.select('tasks')
    .subscribe(
      (data) => {
        this.tasks = data['tasks'];
      }
    )
  }

  getTask() {
    this.store.select('tasks')
    .subscribe(
      (data) => {
        if(data['editedTaskIndex'] > -1){
          this.task = data['editedTask'].task;
          this.editMode = true;
        }
      }
    )
  }

  onAddTask(addTask:string){
    if(this.editMode){
      this.store.dispatch(new TaskActions.UpdateTask(new TaskModel(0, addTask, false)))
      this.editMode = false;
      this.task = null;
    }else{
      this.tasks = this.tasks.slice().sort(function(a, b){
        return a.id-b.id
      })
      let lastTask = this.tasks[this.tasks.length - 1];
      this.index = lastTask.id + 1;
      this.store.dispatch(new TaskActions.AddTask(new TaskModel(this.index, addTask, false)))
      this.task = null;
    }
  }

  ngOnDestroy(){
    this.store.dispatch(new TaskActions.StopEdit());
  }
}
