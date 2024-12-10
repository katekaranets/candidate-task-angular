import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
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
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'users') {
        return JSON.stringify(mockUsers);
      }
      return null;
    });

    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should fetch users from the API if localStorage is empty', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);

      service.getUsers().subscribe(users => {
        expect(users).toEqual(mockUsers.map(({ joining_date, ...rest }) => rest));
      });

      const req = httpMock.expectOne('/assets/mock_users.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);

      expect(localStorage.setItem).toHaveBeenCalledWith('users', JSON.stringify(mockUsers));
    });

    it('should handle API errors', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);

      service.getUsers().subscribe(
        () => fail('Expected an error'),
        error => expect(error.message).toBe('Failed to load users')
      );

      const req = httpMock.expectOne('/assets/mock_users.json');
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getUser', () => {
    it('should return a user from localStorage if found', () => {
      service.getUser(1).subscribe(user => {
        expect(user).toEqual(mockUsers[0]);
      });
    });

    it('should throw an error if the user is not found in localStorage', () => {
      service.getUser(3).subscribe(
        () => fail('Expected an error'),
        error => expect(error.message).toBe('User not found in local storage')
      );
    });

    it('should throw an error if localStorage is empty', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);

      service.getUser(1).subscribe(
        () => fail('Expected an error'),
        error => expect(error.message).toBe('No users found in local storage')
      );
    });
  });

  describe('updateUser', () => {
    it('should update the user in localStorage', () => {
      const updatedData = { name: 'Updated Name' };

      service.updateUser(1, updatedData).subscribe(user => {
        expect(user).toEqual({ ...mockUsers[0], ...updatedData });
      });

      const updatedUsers = [...mockUsers];
      updatedUsers[0] = { ...mockUsers[0], ...updatedData };
      expect(localStorage.setItem).toHaveBeenCalledWith('users', JSON.stringify(updatedUsers));
    });

    it('should throw an error if the user is not found', () => {
      service.updateUser(3, { name: 'Nonexistent User' }).subscribe(
        () => fail('Expected an error'),
        error => expect(error.message).toBe('User not found for update')
      );
    });

    it('should throw an error if localStorage is empty', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);

      service.updateUser(1, { name: 'Updated Name' }).subscribe(
        () => fail('Expected an error'),
        error => expect(error.message).toBe('No users found in local storage')
      );
    });
  });
});
