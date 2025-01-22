import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InvestmentsComponent } from './investments/investments.component';
import { FunctionalityComponent } from './functionality/functionality.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {
        path:'investments',
        component: InvestmentsComponent
      },
      {
        path:'functionality',
        component: FunctionalityComponent
      },
      {
        path:'**',
        redirectTo:'investments',
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
