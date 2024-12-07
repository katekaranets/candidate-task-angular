import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';

import { UsersEffects } from 'src/app/store/effects/users.effects';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboard.routing.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    EffectsModule.forFeature([UsersEffects]),
    UserDashboardRoutingModule
  ],
  providers: [],
})
export class UserDashboardModule { }
