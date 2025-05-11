import { Component, OnInit } from '@angular/core';
import { PaaService } from '../../../../core/services/paa/paa.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  public Acquisitions:any[] = [];
  public isLoading:boolean = false;
  ngOnInit(): void {
    this.getContractAcquisitions();
  }

  constructor(private paaSvc:PaaService) { }

  getContractAcquisitions(){
    this.isLoading = !this.isLoading;
    this.paaSvc.getAcquisitionsContracts()
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
}
