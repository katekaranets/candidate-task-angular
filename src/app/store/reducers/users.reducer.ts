import { createReducer, on } from '@ngrx/store';

import { User } from 'src/app/models/user';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  selectUser,
  updateUser,
  filterUsers,
  filterUsersSuccess,
  filterUsersFailure 
} from '../actions/users.actions';

export interface UsersState {
  users: User[];
  filteredUsers: User[];
  filters: any;
  currentUserId: number | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  filters: {},
  currentUserId: null,
  loading: false,
  error: null,
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
  })),
  on(filterUsers, (state, { filters }) => ({ ...state, filters })),
  on(filterUsersSuccess, (state, { filteredUsers }) => ({ ...state, filteredUsers })),
  on(filterUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
