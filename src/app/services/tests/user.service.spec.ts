import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from the JSON file', () => {
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

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
    });

    const req = httpMock.expectOne('/assets/mock_users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle HTTP errors gracefully', () => {
    const errorMessage = 'Failed to load users';

    service.getUsers().subscribe(
      () => fail('Should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('/assets/mock_users.json');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: errorMessage });
  });
});
