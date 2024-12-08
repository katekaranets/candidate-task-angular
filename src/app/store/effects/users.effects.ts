import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/ls.service';
import { loadUsersSuccess, loadUsersFailure, appInitialize, filterUsers, filterUsersSuccess, filterUsersFailure } from '../actions/users.actions';
import { AppState } from '../app.state';

import { selectUsersList } from '../selectors/users.selector';
import { UserFilterService } from 'src/app/services/user-filter.service';

@Injectable()
export class UsersEffects {  
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private lsService: LocalStorageService,
    private userFilterService: UserFilterService
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

  filterUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterUsers),
      withLatestFrom(this.store.select(selectUsersList)), 
      switchMap(([action, users]) => {
        const filteredUsers = this.userFilterService.filterUsers(users, action.filters);
        return of(filterUsersSuccess({ filteredUsers }));
      }),
      catchError(error => of(filterUsersFailure({ error: error.message })))
    )
  );
}
