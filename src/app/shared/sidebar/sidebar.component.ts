import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();

  public windowWith:any;
  public showInventoryMenu:boolean = false;
  public showSalesMenu:boolean = false;
  public isColapsed:boolean = false;

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

    {
      label:'PAA',
      icon:'assets/icons/incomes.svg',
      route:"/dashboard/PAA"
    },

  ];


  ngOnInit() {
    this.checkScreenWidth();
  }

  constructor() {
    this.checkScreenWidth(); // Verifica el ancho inicial
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  };

  checkScreenWidth() {
    this.windowWith = window.innerWidth;
  };

  toCollapse(){
    this.isColapsed = !this.isColapsed;
      this.close.emit(this.isColapsed);
  };

}
