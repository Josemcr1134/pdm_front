import { Component } from '@angular/core';
interface StrategicLine {
  id: string;
  name: string;
}

interface ProgramCode {
  id: string;
  name: string;
}

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
  categoryTypeSelected:number = 1;
  public strategicLine:string = '';
  public productGoal:string = '';
  public sector:string = '';
  public indicator:string = '';
  public code:string = '';

  public strategicLines: StrategicLine[] = [
    { id: '1', name: 'Technological Innovation' },
    { id: '2', name: 'Environmental Sustainability' },
    { id: '3', name: 'Digital Transformation' },
    { id: '4', name: 'Social Development' },
    { id: '5', name: 'Educational Quality' },
  ];

  public productGoals:{consecutive:number, name:string}[] = [
    { consecutive: 1, name: 'Increase educational coverage' },
    { consecutive: 2, name: 'Reduce carbon emissions' },
    { consecutive: 3, name: 'Implement digital platforms' },
    { consecutive: 4, name: 'Promote social inclusion' },
    { consecutive: 5, name: 'Increase investment in R&D' },
  ];

  public sectors:{id:string, name:string}[] = [
    { id: '1', name: 'Tecnología' },
    { id: '2', name: 'Salud' },
    { id: '3', name: 'Educación' },
    { id: '4', name: 'Finanzas' },
    { id: '5', name: 'Construcción' },
    { id: '6', name: 'Turismo' },
    { id: '7', name: 'Agricultura' },
    { id: '8', name: 'Manufactura' },
    { id: '9', name: 'Transporte' },
    { id: '10', name: 'Energía' },
  ];

  public  programCodes: ProgramCode[] = [
    { id: 'P001', name: 'Research and Development' },
    { id: 'P002', name: 'Environmental Conservation' },
    { id: 'P003', name: 'Digital Skills Training' },
    { id: 'P004', name: 'Community Engagement' },
    { id: 'P005', name: 'Educational Excellence' },
  ];

  public  indicators: Indicator[] = [
    { id: 'I001', name: 'Carbon Footprint Reduction' },
    { id: 'I002', name: 'Employee Satisfaction Rate' },
    { id: 'I003', name: 'Customer Retention Rate' },
    { id: 'I004', name: 'Revenue Growth Percentage' },
    { id: 'I005', name: 'Graduation Rate Improvement' },
  ];

  chooseStrategicLine(value:string){
    this.strategicLine = value;
    this.sector = '';
    this.indicator = '';
    this.code = '';
    this.productGoal = '';
  };

  chooseSector(value:string){
    this.sector = value;
    this.indicator = '';
    this.code = '';
  };

  chooseCode(value:string){
    this.code = value;
    this.indicator = '';
  };

  chooseIndicator(value:string){
    this.indicator = value;
  };

  chooseProductGoal(value:string){
    this.productGoal = value;
    this.strategicLine = '';
    this.sector = '';
    this.indicator = '';
    this.code = '';
  }
}
