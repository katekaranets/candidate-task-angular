import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { loadUsers } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.state';
import { selectUsersList } from 'src/app/store/selectors/users.selector';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  public users$: Observable<User[]>;
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

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.users$ = this.store.select(selectUsersList);
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  goToUserDetails(data: any) {
    this.router.navigate(['/users', data.id]);
  }
}
