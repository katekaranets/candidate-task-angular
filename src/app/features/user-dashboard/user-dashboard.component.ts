import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, startWith, Subject, takeUntil } from 'rxjs';

import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';
import { User } from 'src/app/models/user';
import { filterUsers, loadUsers } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.state';
import { selectFilteredUsers, selectUsersList } from 'src/app/store/selectors/users.selector';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  public users$: Observable<User[]>;
  public filteredUsers$!: Observable<User[]>;

  public form: FormGroup;

  public columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (user: User) => `${user.name}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (user: User) => `${user.email}`,
    },
    {
      columnDef: 'role',
      header: 'Role',
      cell: (user: User) => `${user.role}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (user: User) => `${user.status}`,
    },
  ];
  public displayedColumns = this.columns.map(c => c.columnDef);
  public roles = Object.values(UserRole);
  public statuses = Object.values(UserStatus);

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.users$ = this.store.select(selectUsersList);
    this.form = this.createForm()
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
    this.filteredUsers$ = this.store.select(selectFilteredUsers);
    this.listenToFiltersChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public listenToFiltersChanges() {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.form.value)
      )
      .subscribe(value => {
        this.store.dispatch(filterUsers({ filters: value }));
      })
  }

  public goToUserDetails(data: User) {
    this.router.navigate(['/users', data.id]);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [''],
      role: [''],
      status: ['']
    });
  }
}
