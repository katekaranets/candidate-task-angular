import { usersReducer, initialState, UsersState } from './users.reducer';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  selectUser,
  updateUser,
  filterUsers,
  filterUsersSuccess,
  filterUsersFailure,
} from '../actions/users.actions';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';
import { User } from 'src/app/models/user';

describe('Users Reducer', () => {
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

  it('should return the initial state for an unknown action', () => {
    const action = { type: 'Unknown' };
    const state = usersReducer(initialState, action as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(state).toEqual(initialState);
  });

  it('should set loading to true on loadUsers', () => {
    const action = loadUsers();
    const state = usersReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should update users and set loading to false on loadUsersSuccess', () => {
    const action = loadUsersSuccess({ users: mockUsers });
    const state = usersReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.users).toEqual(mockUsers);
    expect(state.error).toBeNull();
  });

  it('should set error and stop loading on loadUsersFailure', () => {
    const error = 'Failed to load users';
    const action = loadUsersFailure({ error });
    const state = usersReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should set the currentUserId on selectUser', () => {
    const action = selectUser({ userId: 1 });
    const state = usersReducer(initialState, action);

    expect(state.currentUserId).toBe(1);
  });

  it('should update the user on updateUser', () => {
    const initialStateWithUsers: UsersState = {
      ...initialState,
      users: mockUsers,
    };
    const updatedUser = { name: 'John Updated', role: UserRole.HRManager };
    const action = updateUser({ userId: 1, user: updatedUser as User });
    const state = usersReducer(initialStateWithUsers, action);

    expect(state.users[0]).toEqual({ ...mockUsers[0], ...updatedUser });
    expect(state.users[1]).toEqual(mockUsers[1]);
  });

  it('should update filters on filterUsers', () => {
    const filters = { name: 'John', role: 'Admin', status: 'Active' };
    const action = filterUsers({ filters });
    const state = usersReducer(initialState, action);

    expect(state.filters).toEqual(filters);
  });

  it('should update filteredUsers on filterUsersSuccess', () => {
    const filteredUsers = [mockUsers[0]];
    const action = filterUsersSuccess({ filteredUsers });
    const state = usersReducer(initialState, action);

    expect(state.filteredUsers).toEqual(filteredUsers);
  });

  it('should set error on filterUsersFailure', () => {
    const error = 'Filter error';
    const action = filterUsersFailure({ error });
    const state = usersReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});
