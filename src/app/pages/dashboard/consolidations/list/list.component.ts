import { Component, OnInit } from '@angular/core';
import { ConsolidationsService } from '../../../../core/services/consolidations/consolidations.service';
import { PlanningService } from '../../../../core/services/planning/planning.service';
import { debounceTime, Subject, Subscription } from 'rxjs';

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
  public years:any;
  public isLoading:boolean = false;
  public yearSelected:number = 2025;
   search: string = '';
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(private consolidationSvc:ConsolidationsService, private pdmSvc:PlanningService){}

  ngOnInit(): void {
    this.getYears();
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(500)) // 300ms de retraso
      .subscribe(searchTerm => {
        this.getConsolidations();
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  onSearchInput() {
    this.searchSubject.next(this.search);
  }

  getConsolidations(){
    this.isLoading = !this.isLoading;
    this.consolidationSvc.getConsolidations(this.limit, this.offset, this.yearSelected, this.search)
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
  };

  hasAlert(item: any, field: string): boolean {
   return item.alert_fields && item.alert_fields.includes(field);
  };

   getYears(){
    this.isLoading = !this.isLoading;
    this.pdmSvc.getYears()
        .subscribe({
          error:(err:any) => {
            console.log(err);
            this.isLoading = !this.isLoading;
          },
          next:(resp:any) => {
            this.years = resp;
            this.yearSelected = resp.second_year;
            this.isLoading = !this.isLoading;
            this.getConsolidations();

          }
        });
  };

  pageChange(event:any) {
    this.offset = event;
    this.getConsolidations();
  };
}
