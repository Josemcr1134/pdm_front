import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  public year:string = '2024';
  public investmentSelected:any;
  constructor(private router:Router){}


  ngOnInit(): void {
    this.handleYearChange();
  }

  handleYearChange(){
    let currentUrl = this.router.url.slice(0, -4);
    this.router.navigateByUrl(currentUrl+this.year)
  };
}
