import { createAction, props } from '@ngrx/store';
import { UserFilters } from 'src/app/models/filters';

import { User } from 'src/app/models/user';

export const appInitialize = createAction('[App] Initialize');

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: Partial<User>[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: string }>());

export const loadUser = createAction('[User] Load Users', props<{ userId: number }>());
export const loadUserSuccess = createAction('[User] Load Users Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load Users Failure', props<{ error: string }>());

export const updateUser = createAction('[Users] Update User', props<{ userId: number, user: User }>());
export const updateUserSuccess = createAction('[Users] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[Users] Update User Failure', props<{ error: string }>());

export const filterUsers = createAction('[Users] Filter Users', props<{ filters: UserFilters }>());
export const filterUsersSuccess = createAction('[Users] Filter Users Success', props<{ filteredUsers: Partial<User>[] }>());
export const filterUsersFailure = createAction('[Users] Filter Users Failure', props<{ error: string }>());
