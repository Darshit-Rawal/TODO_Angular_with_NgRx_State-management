import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo';
  option: number;

  constructor(
  ){}

  onActive(){
    this.option = 1;
  }

  onCompleted(){
    this.option = 2;
  }

  onAll(){
    this.option = 3;
  }

  onChange(event: any){
    if(event.index === 0){
      this.onActive();
    }else if(event.index === 1){
      this.onCompleted();
    }else{
      this.onAll();
    }
  }
}
