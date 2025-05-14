import { Component, OnInit } from '@angular/core';
import { PaaService } from '../../../../core/services/paa/paa.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  public Acquisitions:any[] = [];
  public Years:any= null;
  public isLoading:boolean = false;
  public yearSelected:number = 2025;
  ngOnInit(): void {
    this.getYears();
  }

  constructor(private paaSvc:PaaService, private planningSvc:PlanningService) { }

  getContractAcquisitions(){
    this.isLoading = !this.isLoading;
    this.paaSvc.getAcquisitionsContracts(this.yearSelected)
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            console.log(resp)
            this.Acquisitions = resp;
            this.isLoading = !this.isLoading;
          }
        });
  };

  getYears(){
    this.planningSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
          },
          next:(resp:any) => {
            this.Years = resp;
            this.yearSelected = resp.first_year;
            this.getContractAcquisitions();
          }
        });
  };
}
