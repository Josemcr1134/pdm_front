import { Component, OnInit } from '@angular/core';
import { NormativityService } from '../../../../core/services/normativity/normativity.service';
interface Sectors {
  id: string;
  name: string;
}
interface Description {
  id: string;
  name: string;
}
interface Types {
  id: string;
  name: string;
}
interface Regulations {
  id: string;
  name: string;
  link:string;
  type:string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  public sectorSelected:string = '';
  public descriptionSelected:string = '';
  public typeSelected:string = '';
  public regulationSelected:string = '';

  public sectors: Sectors[] = [ ];

  public descriptions: Description[] = [];

  public types: Types[] = [ ];

  public regulations: Regulations[] = [];

  constructor(private normativitySvc:NormativityService){}

  ngOnInit(): void {
    this.getSectors();
  }

  getSectors(){
    this.normativitySvc.getAllSectors()
        .subscribe({
          error:(err:any) => {

          },
          next:(resp:any) => {
            this.sectors = resp.results
          }
        })
  };


  chooseSector(value:string){
    this.normativitySvc.getAllDescriptions(value)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.descriptions = resp.results;
              this.sectorSelected = value;
              this.descriptionSelected = '';
              this.typeSelected = '';
              this.regulationSelected = '';
            }
          })
  };

  chooseDescription(value:string){
    this.normativitySvc.getAllTypes(value)
    .subscribe({
      error:(err:any) => {
        console.log(err);
      },

      next:(resp:any) => {
        this.types = resp.results;
        this.descriptionSelected = value;
        this.typeSelected = '';
        this.regulationSelected = '';
      }
    })

  };

  chooseTypes(value:string){
    this.normativitySvc.getAllNormativity(value)
    .subscribe({
      error:(err:any) => {
        console.log(err);
      },
      next:(resp:any) => {
        this.regulations = resp.results;
        this.regulationSelected = '';
        this.typeSelected = value;
      }
    })

  };

  chooseRegulations(value:string){
    window.open(value);
  };

}
