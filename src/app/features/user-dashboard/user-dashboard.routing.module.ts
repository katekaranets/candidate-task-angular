import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDashboardComponent } from './user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('../user-details/user-details.module').then(m => m.UserDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
