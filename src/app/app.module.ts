import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserDashboardModule } from './features/user-dashboard/user-dashboard.module';
import { UserDetailsModule } from './features/user-details/user-details.module';
import { UsersEffects } from './store/effects/users.effects';
import { usersReducer } from './store/reducers/users.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserDashboardModule,
    UserDetailsModule,
    EffectsModule.forRoot(UsersEffects),
    StoreModule.forRoot({ users: usersReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
