import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserDashboardModule } from './components/user-dashboard/user-dashboard.module';
import { UserDetailsModule } from './components/user-details/user-details.module';
import { UsersEffects } from './store/effects/users.effects';
import { usersReducer } from './store/reducers/users.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ users: usersReducer }),
    EffectsModule.forRoot(UsersEffects),
    UserDashboardModule,
    UserDetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
