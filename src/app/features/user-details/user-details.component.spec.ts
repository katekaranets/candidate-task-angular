import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { UserDetailsComponent } from './user-details.component';
import { User } from 'src/app/models/user';
import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';
import { updateUser } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.state';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let storeMock: Partial<Store<AppState>>; 
  let activatedRouteMock: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  let debugElement: DebugElement;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: UserRole.DataEngineer,
    status: UserStatus.Active,
    joining_date: 1620691200000
  };

  beforeEach(() => {
    storeMock = {
      select: jasmine.createSpy().and.returnValue(of(mockUser)),
      dispatch: jasmine.createSpy()
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('1')
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Store, useValue: storeMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update user and switch to view state on save', () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: UserRole.DataEngineer,
      status: UserStatus.Active
    };
    component.form.patchValue(user);
    component.saveUser();

    expect(storeMock.dispatch).toHaveBeenCalledWith(updateUser({ userId: 1, user: user as User }));
    expect(component.state).toBe('view');
  });

  it('should switch to edit state on edit button click', () => {
    const spy = spyOn(component, 'editUser');
    const editButton = debugElement.query(By.css('.edit-button')).nativeElement;

    editButton.click();

    expect(spy).toHaveBeenCalled();
  });
});
