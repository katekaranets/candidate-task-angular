import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, startWith, Subject, takeUntil } from 'rxjs';

import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';
import { User } from 'src/app/models/user';
import { UserFilterService } from 'src/app/services/user-filter.service';
import { loadUsers } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.state';
import { selectUsersList } from 'src/app/store/selectors/users.selector';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [UserFilterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  public users$: Observable<User[]>;
  public filteredUsers$!: Observable<User[]>;

  public form!: FormGroup;

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
    private userFilterService: UserFilterService
  ) {
    this.users$ = this.store.select(selectUsersList);
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
    this.initForm();
    this.setupFilteredUsers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(''),
      role: new FormControl(''),
      status: new FormControl(''),
    });
  }

  setupFilteredUsers() {
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.form.valueChanges.pipe(startWith(this.form.value)),
    ]).pipe(
      takeUntil(this.destroy$),
      map(([users, filters]) => this.userFilterService.filterUsers(users, filters))
    );
  }

  goToUserDetails(data: any) {
    this.router.navigate(['/users', data.id]);
  }
}
