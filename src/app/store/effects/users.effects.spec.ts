import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, throwError, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { UsersEffects } from './users.effects';
import { UserService } from 'src/app/services/user.service';
import { UserFilterService } from 'src/app/services/user-filter.service';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  filterUsersSuccess,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
} from '../actions/users.actions';
import { User } from 'src/app/models/user';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';

describe('UsersEffects', () => {
  let actions$: Subject<any>;
  let effects: UsersEffects;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let storeMock: jasmine.SpyObj<Store>;
  let userFilterServiceMock: jasmine.SpyObj<UserFilterService>;

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.DataEngineer,
      status: UserStatus.Active,
      joining_date: 1620691200000
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: UserRole.DataEngineer,
      status: UserStatus.Active, 
      joining_date: 1620691200000
    },
  ];

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUsers', 'getUser', 'updateUser']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    userFilterServiceMock = jasmine.createSpyObj('UserFilterService', ['filterUsers']);

    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: userServiceMock },
        { provide: Store, useValue: storeMock },
        { provide: UserFilterService, useValue: userFilterServiceMock },
      ],
    });

    effects = TestBed.inject(UsersEffects);
    actions$ = new Subject<any>();
  });

  afterEach(() => {
    actions$.complete();
  });

  it('should dispatch loadUsersSuccess and filterUsersSuccess on loadUsers$', (done) => {
    userServiceMock.getUsers.and.returnValue(of(mockUsers));

    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(loadUsersSuccess({ users: mockUsers }));
      expect(storeMock.dispatch).toHaveBeenCalledWith(filterUsersSuccess({ filteredUsers: mockUsers }));
      done();
    });

    actions$.next(loadUsers());
  });

  it('should dispatch loadUsersFailure on loadUsers$ error', (done) => {
    const error = new Error('Failed to load users');
    userServiceMock.getUsers.and.returnValue(throwError(() => error));

    effects.loadUsers$.subscribe((action) => {
      expect(action).toEqual(loadUsersFailure({ error: error.message }));
      done();
    });

    actions$.next(loadUsers());
  });

  it('should dispatch loadUserSuccess on loadUser$', (done) => {
    const mockUser: User = mockUsers[0];

    userServiceMock.getUser.and.returnValue(of(mockUser));

    effects.loadUser$.subscribe((action) => {
      expect(action).toEqual(loadUserSuccess({ user: mockUser }));
      done();
    });

    actions$.next(loadUser({ userId: 1 }));
  });

  it('should dispatch loadUserFailure on loadUser$ error', (done) => {
    const error = new Error('User not found');
    userServiceMock.getUser.and.returnValue(throwError(() => error));

    effects.loadUser$.subscribe((action) => {
      expect(action).toEqual(loadUserFailure({ error: error.message }));
      done();
    });

    actions$.next(loadUser({ userId: 1 }));
  });

  it('should dispatch updateUserSuccess on updateUser$', (done) => {
    const mockUser: User = mockUsers[0];

    userServiceMock.updateUser.and.returnValue(of(mockUser));

    effects.updateUser$.subscribe((action) => {
      expect(action).toEqual(updateUserSuccess({ user: mockUser }));
      done();
    });

    actions$.next(updateUser({ userId: 1, user: mockUser }));
  });

  it('should dispatch updateUserFailure on updateUser$ error', (done) => {
    const error = new Error('Failed to update user');
    const mockUser: User = mockUsers[0];

    userServiceMock.updateUser.and.returnValue(throwError(() => error));

    effects.updateUser$.subscribe((action) => {
      expect(action).toEqual(updateUserFailure({ error: error.message }));
      done();
    });

    actions$.next(updateUser({ userId: 1, user: mockUser }));
  });
});
