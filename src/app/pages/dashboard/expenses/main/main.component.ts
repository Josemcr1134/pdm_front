import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanningService } from '../../../../core/services/planning/planning.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  public year:string = '2025';
  public investmentSelected:any;
  constructor(private router:Router, private pdmSvc:PlanningService){}


  ngOnInit(): void {
    this.handleYearChange();
    this.getYears();
  }

  handleYearChange(){
    let currentUrl = this.router.url.slice(0, -4);
    this.router.navigateByUrl(currentUrl+this.year)
  };

  getYears(){
    this.pdmSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            console.log(resp)
          }
        })
}
}
