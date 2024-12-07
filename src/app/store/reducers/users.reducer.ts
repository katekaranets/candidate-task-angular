import { createReducer, on } from '@ngrx/store';

import { User } from 'src/app/models/user';
import { loadUsers, loadUsersSuccess, loadUsersFailure, selectUser, updateUser } from '../actions/users.actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentUserId: number | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentUserId: null
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(selectUser, (state, { userId }) => ({ ...state, currentUserId: userId })),
  on(updateUser, (state, { userId, user }) => ({
    ...state,
    users: state.users.map(u => (u.id === userId? { ...u, ...user } : u)),
  }))
);