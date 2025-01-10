import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {


  public windowWith:any;
  public isCollapse:boolean  = false;
  ngOnInit() {
    this.checkScreenWidth();
  }

  constructor() {
    this.checkScreenWidth(); // Verifica el ancho inicial
  }


  checkScreenWidth() {
    this.windowWith = window.innerWidth;
  };

  toCollapse(event:any){
    if (event  === true) {
      this.isCollapse  = true;
    } else {
      this.isCollapse = false;
    }
  }
}
