import { TestBed } from '@angular/core/testing';

import { UserFilters } from 'src/app/models/filters';
import { User } from 'src/app/models/user';
import { UserFilterService } from '../user-filter.service';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';

describe('UserFilterService', () => {
  let service: UserFilterService;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.BackendDeveloper,
      status: UserStatus.Active,
      joining_date: 1620691200000
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: UserRole.FrontendDeveloper,
      status: UserStatus.OnLeave,
      joining_date: 1620691200000
    },
    {
      id: 3,
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: UserRole.FrontendDeveloper,
      status: UserStatus.Active,
      joining_date: 1620691200000
    },
    {
      id: 4,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: UserRole.HRManager,
      status: UserStatus.OnSabbatical,
      joining_date: 1620691200000
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFilterService],
    });
    service = TestBed.inject(UserFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all users when no filters are applied', () => {
    const filters: UserFilters = { name: '', role: '', status: '' };
    const result = service.filterUsers(mockUsers, filters);
    expect(result.length).toBe(mockUsers.length);
  });

  it('should filter users by name', () => {
    const filters: UserFilters = { name: 'Bob', role: '', status: '' };
    const result = service.filterUsers(mockUsers, filters);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Bob Johnson');
  });

  it('should filter users by role', () => {
    const filters: UserFilters = { role: UserRole.FrontendDeveloper, name: '', status: '' };
    const result = service.filterUsers(mockUsers, filters);
    expect(result.length).toBe(2);
    expect(result.every(user => user.role === UserRole.FrontendDeveloper)).toBeTrue();
  });

  it('should filter users by status', () => {
    const filters: UserFilters = { name: '', role: '', status: UserStatus.Active };
    const result = service.filterUsers(mockUsers, filters);
    expect(result.length).toBe(2);
    expect(result.every(user => user.status === UserStatus.Active)).toBeTrue();
  });

  it('should filter users by name, role, and status', () => {
    const filters: UserFilters = { name: 'Alice', role: UserRole.FrontendDeveloper, status: UserStatus.Active };
    const result = service.filterUsers(mockUsers, filters);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Alice Brown');
  });

  it('should return an empty array when no users match the filters', () => {
    const filters: UserFilters = { name: 'Nonexistent', role: 'Manager', status: 'Inactive' };
    const result = service.filterUsers(mockUsers, filters);
    expect(result.length).toBe(0);
  });
});
