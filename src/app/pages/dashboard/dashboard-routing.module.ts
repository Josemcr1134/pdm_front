import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NationalReportsModule } from './national-reports/national-reports.module';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {
        path: 'planning',
        loadChildren: () => import('./planning/planning.module').then(m => m.PlanningModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'national-planning',
        loadChildren: () => import('./national-planning/national-planning.module').then(m => m.NationalPlanningModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'national-reports',
        loadChildren: () => import('./national-reports/national-reports.module').then(m => m.NationalReportsModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'guidelines',
        loadChildren: () => import('./guidelines/guidelines.module').then(m => m.GuidelinesModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'regulations',
        loadChildren: () => import('./regulations/regulations.module').then(m => m.RegulationsModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'departamental-planning',
        loadChildren: () => import('./departamental-planning/departamental-planning.module').then(m => m.DepartamentalPlanningModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'pts',
        loadChildren: () => import('./pts/pts.module').then(m => m.PtsModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'pdtv',
        loadChildren: () => import('./pdtv/pdtv.module').then(m => m.PdtvModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'expenses',
        loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'incomes',
        loadChildren: () => import('./incomes/incomes.module').then(m => m.IncomesModule)
        // canActivate:[AuthGuard]
      },
      {
        path: 'jac',
        loadChildren: () => import('./jac/jac.module').then(m => m.JacModule)
        // canActivate:[AuthGuard]
      },
      {
        path:'**',
        redirectTo:'planning',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
