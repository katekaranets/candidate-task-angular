import { selectUsersState, selectUsersList, selectFilteredUsers } from './users.selector';
import { AppState } from '../app.state';
import { UsersState } from '../reducers/users.reducer';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';

describe('Users Selectors', () => {
  const initialUsersState: UsersState = {
    users: [
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
    ],
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.DataEngineer,
      status: UserStatus.Active,
      joining_date: 1620691200000
    },
    filteredUsers: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.DataEngineer,
        status: UserStatus.Active,
        joining_date: 1620691200000

      },
    ],
    filters: {
      name: '',
      role: '',
      status: ''
    },
    error: null,
    loading: false,
    usersLoaded: false
  };

  const appState: AppState = {
    users: initialUsersState,
  };

  it('should select the users state', () => {
    const result = selectUsersState(appState);
    expect(result).toEqual(initialUsersState);
  });

  it('should select the list of users', () => {
    const result = selectUsersList.projector(initialUsersState);
    expect(result).toEqual(initialUsersState.users);
  });

  it('should select filtered users', () => {
    const result = selectFilteredUsers.projector(initialUsersState);
    expect(result).toEqual(initialUsersState.filteredUsers);
  });
});
