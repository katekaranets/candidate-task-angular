import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';

import { UsersEffects } from 'src/app/store/effects/users.effects';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboard.routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UserDashboardComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule, 
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([UsersEffects]),
    UserDashboardRoutingModule
  ],
  providers: [],
})
export class UserDashboardModule { }
