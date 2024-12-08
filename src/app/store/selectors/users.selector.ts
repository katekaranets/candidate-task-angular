import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UsersState } from '../reducers/users.reducer';

export const selectUsersState = (state: AppState) => state.users;

export const selectUsersList = createSelector(
  selectUsersState,
  (usersState: UsersState) => usersState.users
);

export const selectCurrentUser = createSelector(
  selectUsersState,
  (state: UsersState) =>
    state.currentUserId ? state.users.find(user => user.id === state.currentUserId) : null
);

export const selectFilteredUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.filteredUsers
);
