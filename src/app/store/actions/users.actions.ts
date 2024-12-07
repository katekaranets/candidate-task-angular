import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/models/user';

export const appInitialize = createAction('[App] Initialize');

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: string }>());
export const selectUser = createAction('[Users] Select User', props<{ userId: number }>());
export const updateUser = createAction('[Users] Update User', props<{ userId: number, user: User }>());
