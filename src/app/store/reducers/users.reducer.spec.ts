import { usersReducer, initialState } from './users.reducer';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  filterUsers,
  filterUsersSuccess,
  filterUsersFailure,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from '../actions/users.actions';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';

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

  it('should set loading to true on loadUser', () => {
    const newState = usersReducer(initialState, loadUser({ userId: 1 }));
    expect(newState.loading).toBeTrue();
  });

  it('should update user and stop loading on loadUserSuccess', () => {
    const newState = usersReducer(initialState, loadUserSuccess({ user: mockUsers[0] }));
    expect(newState.user).toEqual(mockUsers[0]);
    expect(newState.loading).toBeFalse();
  });

  it('should set error and stop loading on loadUserFailure', () => {
    const error = 'Failed to load user';
    const newState = usersReducer(initialState, loadUserFailure({ error }));
    expect(newState.error).toBe(error);
    expect(newState.loading).toBeFalse();
  });

  it('should set loading to true on updateUser', () => {
    const user = {
      id: 1,
      name: 'Test',
      email: 'john@example.com',
      role: UserRole.DataEngineer,
      status: UserStatus.Active,
      joining_date: 1620691200000
    }
    const newState = usersReducer(initialState, updateUser({ userId: 1, user }));
    expect(newState.loading).toBeTrue();
  });

  it('should update user and stop loading on updateUserSuccess', () => {
    const newState = usersReducer(initialState, updateUserSuccess({ user: mockUsers[0] }));
    expect(newState.user).toEqual(mockUsers[0]);
    expect(newState.loading).toBeFalse();
  });

  it('should set error and stop loading on updateUserFailure', () => {
    const error = 'Failed to update user';
    const newState = usersReducer(initialState, updateUserFailure({ error }));
    expect(newState.error).toBe(error);
    expect(newState.loading).toBeFalse();
  });
});


