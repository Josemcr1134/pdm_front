import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  public  categorySelected:number = 1;


  chooseCategory(value:number){
    this.categorySelected = value;
  };
}
