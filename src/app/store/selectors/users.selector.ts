import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UsersState } from '../reducers/users.reducer';

export const selectUsersState = (state: AppState) => state.users;

export const selectUsersList = createSelector(
  selectUsersState,
  (usersState: UsersState) => usersState.users
);

export const selectUser = createSelector(
  selectUsersState,
  (usersState: UsersState) => usersState.user
);

export const selectFilteredUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.filteredUsers
);

export const selectUsersLoaded = createSelector(
  selectUsersState,
  (state: UsersState) => state.usersLoaded
)
