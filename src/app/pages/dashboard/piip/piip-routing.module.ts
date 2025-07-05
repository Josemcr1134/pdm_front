import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./list/list.component').then( m => m.ListComponent)
  },
  {
    path:'detail/:id',
    loadComponent: () => import('./detail/detail.component').then( m => m.DetailComponent),
    children:[
      {
        path:'goalCurrency',
        loadComponent: () => import('./goal-currency/goal-currency.component').then( m => m.GoalCurrencyComponent),
      },
      {
        path:'progressMade',
        loadComponent: () => import('./progress-made/progress-made.component').then( m => m.ProgressMadeComponent),
      },
      {
        path:'**',
        redirectTo:'goalCurrency',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PIIPRoutingModule { }
