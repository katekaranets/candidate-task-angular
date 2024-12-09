import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import {
  loadUsersSuccess,
  loadUsersFailure,
  appInitialize,
  filterUsers,
  filterUsersSuccess,
  filterUsersFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  loadUsers,
  loadUser,
  loadUserFailure,
  loadUserSuccess
} from '../actions/users.actions';
import { AppState } from '../app.state';

import { selectUsersList } from '../selectors/users.selector';
import { UserFilterService } from 'src/app/services/user-filter.service';

@Injectable()
export class UsersEffects {  
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private userFilterService: UserFilterService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appInitialize),
      mergeMap(() => {
        return this.userService.getUsers().pipe(
          map((users) => {
            this.store.dispatch(filterUsersSuccess({ filteredUsers: users }));
            return loadUsersSuccess({ users })
          }),            
          catchError(error => of(loadUsersFailure({ error: error.message })))
        )
      })
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap(({ userId }) => 
        this.userService.getUser(userId).pipe(
          map((user) => loadUserSuccess({ user })),            
          catchError(error => of(loadUserFailure({ error: error.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ userId, user }) =>
        this.userService.updateUser(userId, user).pipe(
          map(updatedUser => updateUserSuccess({ user: updatedUser })),
          catchError(error => of(updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserSuccess),
      map(() => loadUsers())
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
