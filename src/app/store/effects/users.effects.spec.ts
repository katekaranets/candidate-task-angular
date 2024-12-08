import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';

import { UsersEffects } from './users.effects';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/ls.service';
import {
  appInitialize,
  loadUsersSuccess,
  loadUsersFailure
} from '../actions/users.actions';
import { UserFilterService } from 'src/app/services/user-filter.service';
import { User } from 'src/app/models/user';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';

describe('UsersEffects', () => {
  let actions$: Observable<any>;
  let effects: UsersEffects;
  let userService: jasmine.SpyObj<UserService>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let userFilterService: jasmine.SpyObj<UserFilterService>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.DataEngineer,
      status: UserStatus.Active,
      joining_date: 1620691200000
    }
  ];

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['loadStateFromLocalStorage']);
    const userFilterServiceSpy = jasmine.createSpyObj('UserFilterService', ['filterUsers']);

    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: UserService, useValue: userServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: UserFilterService, useValue: userFilterServiceSpy },
      ],
    });

    effects = TestBed.inject(UsersEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    userFilterService = TestBed.inject(UserFilterService) as jasmine.SpyObj<UserFilterService>;
  });

  it('should dispatch loadUsersSuccess with users from localStorage', (done) => {
    localStorageService.loadStateFromLocalStorage.and.returnValue({ 
      users: { 
        users: mockUsers,
        currentUserId: 1,
        filteredUsers: mockUsers,
        filters: {
          name: '',
          role: '',
          status: ''
        },
        error: null,
        loading: false
      },
    });
    actions$ = of(appInitialize());

    effects.loadUsers$.subscribe((result) => {
      expect(result).toEqual(loadUsersSuccess({ users: mockUsers }));
      done();
    });
  });

  it('should dispatch loadUsersSuccess when users are fetched from API', (done) => {
    localStorageService.loadStateFromLocalStorage.and.returnValue(undefined);
    userService.getUsers.and.returnValue(of(mockUsers));
    actions$ = of(appInitialize());

    effects.loadUsers$.subscribe((result) => {
      expect(result).toEqual(loadUsersSuccess({ users: mockUsers }));
      done();
    });
  });

  it('should dispatch loadUsersFailure on API error', (done) => {
    const error = new Error('Failed to load users');
    localStorageService.loadStateFromLocalStorage.and.returnValue(undefined);
    userService.getUsers.and.returnValue(throwError(() => error));
    actions$ = of(appInitialize());

    effects.loadUsers$.subscribe((result) => {
      expect(result).toEqual(loadUsersFailure({ error: error.message }));
      done();
    });
  });
});
