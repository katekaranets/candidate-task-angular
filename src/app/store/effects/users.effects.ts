import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/ls.service';
import { loadUsersSuccess, loadUsersFailure, appInitialize } from '../actions/users.actions';

@Injectable()
export class UsersEffects {  
  constructor(
    private actions$: Actions, 
    private userService: UserService,
    private lsService: LocalStorageService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appInitialize),
      mergeMap(() => {
        const state = this.lsService.loadStateFromLocalStorage();
        if (state && state.users.users.length > 0) {
          return of(loadUsersSuccess({ users: state.users.users }));
        } else {
          return this.userService.getUsers().pipe(
            map((users) => loadUsersSuccess({ users })),            
            catchError(error => of(loadUsersFailure({ error: error.message })))
          )
        }
      })
    )
  );
}
