import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoutingModule } from './user-details.routing';

@NgModule({
  declarations: [
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatButtonModule,
    MatInputModule,
    MatSelectModule, 
    MatIconModule,
    UserDetailsRoutingModule
  ],
  providers: [],
})
export class UserDetailsModule { }
