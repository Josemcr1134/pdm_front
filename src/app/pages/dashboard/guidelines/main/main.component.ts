import { Component, OnInit } from '@angular/core';
interface Guideline {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  subclass: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent{
  public guidelineSelected:string = '';
  public productSelected:string = '';

  public guidelines: Guideline[] = [
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
  public products: Product[] = [
    { id: 'P001', name: 'Wireless Mouse', subclass: 'Electronics' },
    { id: 'P002', name: 'Bluetooth Keyboard', subclass: 'Electronics' },
    { id: 'P003', name: 'Running Shoes', subclass: 'Footwear' },
    { id: 'P004', name: 'Yoga Mat', subclass: 'Fitness' },
    { id: 'P005', name: 'Stainless Steel Bottle', subclass: 'Kitchen' },
    { id: 'P006', name: 'Desk Lamp', subclass: 'Home Decor' },
    { id: 'P007', name: 'Noise Cancelling Headphones', subclass: 'Electronics' },
    { id: 'P008', name: 'Smartphone Case', subclass: 'Accessories' },
    { id: 'P009', name: 'Leather Wallet', subclass: 'Accessories' },
    { id: 'P010', name: 'Graphic T-shirt', subclass: 'Apparel' },
  ];

  chooseGuideline(value:string){
    this.guidelineSelected = value;
    this.productSelected = '';
  };

  chooseProduct(value:string){
    this.productSelected = value;
  };
}
