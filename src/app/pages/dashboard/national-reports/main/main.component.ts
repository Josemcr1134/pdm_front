import { Component } from '@angular/core';
// Definir la interfaz para el tipo de objeto
interface NationalReport {
  id: string;
  date: Date; // Puedes usar string si las fechas son texto
  name: string;
}
// Define the type for a dependency
interface Dependency {
  id: string;       // Unique identifier for the dependency
  date: Date;       // Date associated with the dependency
  name: string;     // Name of the dependency
}

// Define the type for an entity
interface Entity {
  id: string;       // Unique identifier for the entity
  date: Date;       // Date associated with the entity
  name: string;     // Name of the entity
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  public categoryTypeSelected:number = 0;
  public reportSelected:string = '';
  public dependencySelected:string = '';
  public entitySelected:string = '';

  public nationalReport: NationalReport[] = [
    {
      id: '1',
      date: new Date('2025-01-01'),
      name: 'Informe Anual 2024',
    },
    {
      id: '2',
      date: new Date('2025-02-15'),
      name: 'Reporte Semestral 2025',
    },
    {
      id: '3',
      date: new Date('2025-03-10'),
      name: 'Estadísticas Nacionales Marzo 2025',
    },
  ];

  public dependencies: Dependency[] = [
    { id: '1', date: new Date('2025-01-01'), name: 'Dependency A' },
    { id: '2', date: new Date('2025-01-02'), name: 'Dependency B' },
    { id: '3', date: new Date('2025-01-03'), name: 'Dependency C' },
  ];

  public entities: Entity[] = [
    { id: '1', date: new Date('2025-01-10'), name: 'Entity A' },
    { id: '2', date: new Date('2025-01-11'), name: 'Entity B' },
    { id: '3', date: new Date('2025-01-12'), name: 'Entity C' },
  ];

  chooseNationalReport(value:string){
    this.reportSelected = value;
  };

  chooseDependency(value:string){
    this.dependencySelected = value;
    this.entitySelected = '';
  };

  chooseEntity(value:string) {
    this.entitySelected = value;
    this.dependencySelected ='';
  };

  chooseCategory(value:number){
    this.reportSelected = '';

    if (this.categoryTypeSelected == value) {
      this.categoryTypeSelected = 0
    } else {
      this.categoryTypeSelected = value;
    };
  };



}
