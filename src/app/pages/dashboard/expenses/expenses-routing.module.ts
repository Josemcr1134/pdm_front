import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {
        path: 'investments/:year',
        loadChildren: () => import('./investments/investments.module').then(m => m.InvestmentsModule)
      },
      {
        path: 'functionality/:year',
        loadChildren: () => import('./functionality/functionality.module').then(m => m.FunctionalityModule)
      },
      {
        path:'**',
        redirectTo:'investments/2024',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
