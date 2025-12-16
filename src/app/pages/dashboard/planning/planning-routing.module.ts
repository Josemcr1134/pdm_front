import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DetailComponent } from './detail/detail.component';
import { ScheduledGoalComponent } from './scheduled-goal/scheduled-goal.component';
import { ExecutedGoalComponent } from './executed-goal/executed-goal.component';
import { ContractsComponent } from './contracts/contracts.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CoverageComponent } from './coverage/coverage.component';
import { EvidencesComponent } from './evidences/evidences.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    children: [
      {
        path: 'scheduledGoal',
        component: ScheduledGoalComponent
      },
      {
        path: 'executedGoal',
        component: ExecutedGoalComponent
      },
      {
        path: 'contracts/:codeProductMga/:contractId/:contractingUnit/:supervisorName/:responsibleEmail/:responsiblePhone',
        component: ContractsComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },

      {
        path: 'coverage',
        component: CoverageComponent
      },
      {
        path: 'evidences',
        component: EvidencesComponent
      },
      {
        path: '**',
        redirectTo: 'scheduledGoal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
