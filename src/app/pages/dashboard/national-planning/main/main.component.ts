import { Component } from '@angular/core';
type Transformation = {
  id: string;
  name: string;
};
type Catalyst = {
  id: string;
  name: string;
};
type Components = {
  id: string;
  name: string;
};

interface Indicator {
  id: string;
  name: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  public categoryTypeSelected:number = 1;

  public transformation:string = '';
  public productGoal:string = '';
  public catalyst:string = '';
  public component:string = '';
  public indicator:string = '';

  public transformations: Transformation[] = [
    { id: '1', name: "Rotación" },
    { id: '2', name: "Traslación" },
    { id: '3', name: "Escalado" },
    { id: '4', name: "Reflexión" },
  ];

  public productGoals:{consecutive:string, name:string}[] = [
    { consecutive: '1', name: 'Increase educational coverage' },
    { consecutive: '2', name: 'Reduce carbon emissions' },
    { consecutive: '3', name: 'Implement digital platforms' },
    { consecutive: '4', name: 'Promote social inclusion' },
    { consecutive: '5', name: 'Increase investment in R&D' },
  ];

  public catalysts: Catalyst[] = [
    { id: "1", name: "Enzyme" },
    { id: "2", name: "Acid" },
    { id: "3", name: "Base" },
    { id: "4", name: "Metal Catalyst" },
  ];

  public components: Components[] = [
    { id: "1", name: "Processor" },
    { id: "2", name: "Memory" },
    { id: "3", name: "Storage" },
    { id: "4", name: "Graphics Card" },
    { id: "5", name: "Power Supply" },
  ];

  public  indicators: Indicator[] = [
    { id: 'I001', name: 'Carbon Footprint Reduction' },
    { id: 'I002', name: 'Employee Satisfaction Rate' },
    { id: 'I003', name: 'Customer Retention Rate' },
    { id: 'I004', name: 'Revenue Growth Percentage' },
    { id: 'I005', name: 'Graduation Rate Improvement' },
  ];

  chooseTransformation(value:string){
    this.transformation = value;
    this.productGoal = '';
    this.catalyst = '';
    this.indicator = '';
    this.component = '';
    this.productGoal = '';
  };

  chooseCatalyst(value:string){
    this.catalyst = value;
    this.indicator = '';
    this.productGoal = '';
  };

  chooseComponent(value:string) {
    this.component = value;
    this.indicator = '';
    this.productGoal = '';
  };

  chooseIndicator(value:string){
    this.indicator = value;
    this.productGoal = '';
  };

  chooseProductGoal(value:string){
    this.productGoal = value;
    if (this.categoryTypeSelected == 2) {
      this.catalyst = '';
      this.component = '';
      this.indicator = '';
    };
  };



}
