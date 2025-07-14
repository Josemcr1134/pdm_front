import { Component, OnInit } from '@angular/core';
import { ConsolidationsService } from '../../../../core/services/consolidations/consolidations.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  public offset:number = 0;
  public limit:number = 10;
  public totalItems:number = 0;
  public Consolidations:any[] = [];
  public isLoading:boolean = false;
  constructor(private consolidationSvc:ConsolidationsService){}

  ngOnInit(): void {
    this.getConsolidations();
  }

  getConsolidations(){
    this.isLoading = !this.isLoading;
    this.consolidationSvc.getConsolidations(this.limit, this.offset)
      .subscribe({
        error:(err:any) => {
          console.log(err);
          this.isLoading = !this.isLoading;
        },
        next:(resp:any) => {
          console.log(resp);
          this.Consolidations = resp.results.report;
          this.totalItems = resp.count;
          this.isLoading = !this.isLoading;
        }
      });
  }

  hasAlert(item: any, field: string): boolean {
   return item.alert_fields && item.alert_fields.includes(field);
  }

  pageChange(event:any) {
    this.offset = event;
    this.getConsolidations();
  }
}
