import { createReducer, on } from '@ngrx/store';

import { User } from 'src/app/models/user';
import { UserFilters } from 'src/app/models/filters';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  updateUser,
  filterUsers,
  filterUsersSuccess,
  filterUsersFailure, 
  updateUserSuccess,
  updateUserFailure,
  loadUser,
  loadUserFailure,
  loadUserSuccess
} from '../actions/users.actions';

export interface UsersState {
  users: Partial<User>[];
  user: User;
  filteredUsers: Partial<User>[];
  filters: UserFilters;
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  user: {
    name: '',
    email: '',
    id: null,
    joining_date:  null,
    role: '',
    status: ''
  },
  filteredUsers: [],
  filters: {
    name: '',
    status: '',
    role: ''
  },
  loading: false,
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(loadUser, (state) => ({ ...state, loading: true })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(loadUserFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateUser, (state) => ({ ...state, loading: true})),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
    users: state.users.map(u => (u.id === user.id? { ...u, ...user } : u)),
  })),
  on(updateUserFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(filterUsers, (state, { filters }) => ({ ...state, filters })),
  on(filterUsersSuccess, (state, { filteredUsers }) => ({ ...state, filteredUsers })),
  on(filterUsersFailure, (state, { error }) => ({ ...state, error })),
);
