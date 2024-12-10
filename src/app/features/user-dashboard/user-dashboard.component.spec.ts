import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { UserDashboardComponent } from './user-dashboard.component';
import { UserFilterService } from 'src/app/services/user-filter.service';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';
import { User } from 'src/app/models/user';
import { filterUsers } from 'src/app/store/actions/users.actions';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserFilterService: jasmine.SpyObj<UserFilterService>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: UserRole.DataEngineer,
      status: UserStatus.Active,
      joining_date: 1620691200000
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: UserRole.FrontendDeveloper,
      status: UserStatus.OnLeave,
      joining_date: 1620691200000
    },
  ];

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUserFilterService = jasmine.createSpyObj('UserFilterService', ['filterUsers']);

    TestBed.configureTestingModule({
      declarations: [UserDashboardComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: UserFilterService, useValue: mockUserFilterService },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;

    mockStore.select.and.returnValue(of(mockUsers));
    mockUserFilterService.filterUsers.and.returnValue(mockUsers);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.value).toEqual({
      name: '',
      role: '',
      status: '',
    });
  });

  it('should start listen to filter changes on init', () => {
    const listenToFiltersChangesSpy = spyOn(component, 'listenToFiltersChanges');

    component.ngOnInit();

    expect(listenToFiltersChangesSpy).toHaveBeenCalled();
  });


  it('should filter users when filter inputs updated', () => {
    component.listenToFiltersChanges();

    component.form.get('name')?.setValue('Thom')

    expect(mockStore.dispatch).toHaveBeenCalledWith(filterUsers({ 
      filters: { name: 'Thom', role: '', status: '' } 
    }));
  });

  it('should navigate to user details page', () => {
    const user = mockUsers[0];
  
    component.goToUserDetails(user);
  
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users', 1]);
  });

  it('should complete destroy$ on component destroy', () => {
    const destroySpy = spyOn(component['destroy$'], 'next');
    const completeSpy = spyOn(component['destroy$'], 'complete');
  
    component.ngOnDestroy();
  
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
