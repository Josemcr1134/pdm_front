import { Component } from '@angular/core';
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
  url:string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  public sectorSelected:string = '';
  public descriptionSelected:string = '';
  public typeSelected:string = '';
  public regulationSelected:string = '';

  public sectors: Sectors[] = [
    { id: '1', name: 'Compliance with safety regulations' },
    { id: '2', name: 'Adherence to quality standards' },
    { id: '3', name: 'Effective communication protocols' },
    { id: '4', name: 'Environmental sustainability practices' },
    { id: '5', name: 'Proper resource allocation' },
    { id: '6', name: 'Employee training and development' },
    { id: '7', name: 'Customer satisfaction measures' },
    { id: '8', name: 'Data protection and privacy' },
    { id: '9', name: 'Risk assessment and mitigation' },
    { id: '10', name: 'Continuous improvement initiatives' },
  ];

  public descriptions: Description[] = [
    { id: 'P001', name: 'Wireless Mouse'},
    { id: 'P002', name: 'Bluetooth Keyboard'},
    { id: 'P003', name: 'Running Shoes' },
    { id: 'P004', name: 'Yoga Mat'},
    { id: 'P005', name: 'Stainless Steel Bottle'},
    { id: 'P006', name: 'Desk Lamp' },
    { id: 'P007', name: 'Noise Cancelling Headphones'},
    { id: 'P008', name: 'Smartphone Case' },
    { id: 'P009', name: 'Leather Wallet' },
    { id: 'P010', name: 'Graphic T-shirt' },
  ];

  public types: Types[] = [
    { id: 'P001', name: 'Wireless Mouse'},
    { id: 'P002', name: 'Bluetooth Keyboard'},
    { id: 'P003', name: 'Running Shoes' },
    { id: 'P004', name: 'Yoga Mat'},
    { id: 'P005', name: 'Stainless Steel Bottle'},
    { id: 'P006', name: 'Desk Lamp' },
    { id: 'P007', name: 'Noise Cancelling Headphones'},
    { id: 'P008', name: 'Smartphone Case' },
    { id: 'P009', name: 'Leather Wallet' },
    { id: 'P010', name: 'Graphic T-shirt' },
  ];

  public regulations: Regulations[] = [
    { url:'https://www.google.com', id: 'P001', name: 'Wireless Mouse'},
    { url:'https://www.google.com', id: 'P002', name: 'Bluetooth Keyboard'},
    { url:'https://www.google.com', id: 'P003', name: 'Running Shoes' },
    { url:'https://www.google.com', id: 'P004', name: 'Yoga Mat'},
    { url:'https://www.google.com', id: 'P005', name: 'Stainless Steel Bottle'},
    { url:'https://www.google.com', id: 'P006', name: 'Desk Lamp' },
    { url:'https://www.google.com', id: 'P007', name: 'Noise Cancelling Headphones'},
    { url:'https://www.google.com', id: 'P008', name: 'Smartphone Case' },
    { url:'https://www.google.com', id: 'P009', name: 'Leather Wallet' },
    { url:'https://www.google.com', id: 'P010', name: 'Graphic T-shirt' },
  ];

  chooseSector(value:string){
    this.sectorSelected = value;
    this.descriptionSelected = '';
    this.typeSelected = '';
    this.regulationSelected = '';
  };

  chooseDescription(value:string){
    this.descriptionSelected = value;
    this.typeSelected = '';
    this.regulationSelected = '';
  };

  chooseTypes(value:string){
    this.regulationSelected = '';
    this.typeSelected = value;
  };

  chooseRegulations(value:string){
    window.open(value);
  };

}
