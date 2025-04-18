import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
  @Output() close = new EventEmitter<boolean>();

  public windowWith:any;



  public menuItems:{label:string, icon:string, route:string}[] = [
    {
      label:'Tablero ',
      icon:'assets/icons/planning.svg',
      route:"/dashboard/metricsBoard"
    },
    {
      label:'Planeación',
      icon:'assets/icons/planning.svg',
      route:"/dashboard/planning/false"
    },
    // {
    //   label:'Planeación Nacional',
    //   icon:'assets/icons/national-planning.svg',
    //   route:"/dashboard/national-planning"
    // },

    // {
    //   label:'Informes Nacionales',
    //   icon:'assets/icons/national-reports.svg',
    //   route:"/dashboard/national-reports"
    // },
    // {
    //   label:'Lineamientos',
    //   icon:'assets/icons/guidelines.svg',
    //   route:"/dashboard/guidelines"
    // },
    {
      label:'Normativas',
      icon:'assets/icons/regulations.svg',
      route:"/dashboard/regulations"

    },
    {
      label:'Planeación Departamental',
      icon:'assets/icons/departamental-planning.svg',
      route:"/dashboard/planning/true"
    },
    // {
    //   label:'P.T.S',
    //   icon:'assets/icons/pts.svg',
    //   route:"/dashboard/pts"
    // },
    // {
    //   label:'P.D.T.V',
    //   icon:'assets/icons/pdtv.svg',
    //   route:"/dashboard/pdtv"
    // },
    {
      label:'Gastos',
      icon:'assets/icons/expenses.svg',
      route:"/dashboard/expenses"
    },
    {
      label:'Ingresos',
      icon:'assets/icons/incomes.svg',
      route:"/dashboard/incomes"
    },

  ]

  closeMenu(){
    this.close.emit(true)
  }




}
