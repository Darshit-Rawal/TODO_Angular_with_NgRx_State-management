import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { TaskModel } from '../models/task.model';

import * as fromTasks from '../store/task.reducers';
import * as TaskActions from '../store/task.actions';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit, OnChanges {

  @Input() option:number;
  tasks: TaskModel[];
  taskState!: Observable<TaskModel[]>;
  task: TaskModel;
  taskOptions: number = 1;
  constructor(
    private store: Store<fromTasks.State>
  ) { }

  style = {
    'background-color': '#c9c9ff'
  };
  card_styles = [
    {
      'background-color':'#c9c9ff'
    },
    {
      'background-color':'#c3e4bc'
    },
    {
      'background-color':'#f5f5f5'
    }
  ]

  color:string = '#8f8fff';
  redius:string = '5';


  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
        if (property === 'option') {
          this.taskOptions = changes[property].currentValue === undefined ? 1 : changes[property].currentValue;
          if(this.taskOptions === 1){
            this.getActivateTask();
            this.style = this.card_styles[0];
          }else if(this.taskOptions === 2){
            this.getCompletedTasks();
            this.style = this.card_styles[1];
          }else{
            this.getAllTasks();
            this.style = this.card_styles[2];
          }
        }
    }
}
  ngOnInit(): void {
    this.getActivateTask();
  }

  getAllTasks(){
      this.store.select('tasks').forEach(tasks => {
        this.tasks = tasks['tasks'];
    });
  }

  getCompletedTasks(){
    this.store.select('tasks').forEach(tasks => {
      this.tasks = tasks['tasks'];
      this.tasks = this.tasks.filter(
        (task) => {
          if(task.status === true){
            return task;
          }
        }
      )
    })
  }

  getActivateTask(){
    this.store.select('tasks').forEach(tasks => {
      this.tasks = tasks['tasks'];
      this.tasks = this.tasks.filter(
        (task) => {
          if(task.status === false){
            return task;
          }
        }
      )
    })
  }

  onCardClick(index: number){
    this.store.select('tasks').forEach(
      (tasks) => {
        let clickTasks = tasks['tasks'].filter(
          task => {
            if(task.id === index){
              return task;
            }
          }
        )[0];
        this.task = clickTasks;
      }
    );

    this.store.dispatch(new TaskActions.StartChangeStatus(this.task.id));
    this.store.dispatch(new TaskActions.UpdateTask(new TaskModel(this.task.id, this.task.task, true)));
  }

  onDelete(index: number){
    this.store.dispatch(new TaskActions.DeleteTask(index));
  }

  onEdit(index: number){
    this.store.dispatch(new TaskActions.StartEdit(index));
  }

}
