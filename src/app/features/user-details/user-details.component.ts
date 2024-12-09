import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { UserRole } from 'src/app/models/role';
import { UserStatus } from 'src/app/models/status';
import { UserDetailsState } from 'src/app/models/user-details-state';
import { User } from 'src/app/models/user';
import { loadUser, updateUser } from 'src/app/store/actions/users.actions';
import { AppState } from 'src/app/store/app.state';
import { selectUser } from 'src/app/store/selectors/users.selector';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  public form: FormGroup;
  public state: UserDetailsState = UserDetailsState.VIEW;
  public userDetailsState = UserDetailsState;

  public roles = Object.values(UserRole);
  public statuses = Object.values(UserStatus);

  private user!: User;
  private userId: number;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.user$ = this.store.select(selectUser);

    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadUser();
    this.initializeUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public saveUser(): void {
    if (this.form.valid) {
      this.store.dispatch(updateUser({ userId: this.userId, user: this.form.value }));
      this.setState(UserDetailsState.VIEW);
    }
  }

  public editUser(): void {
    this.setState(UserDetailsState.EDIT);
  }

  public cancelEditUser(): void{
    if (this.user) {
      this.form.reset(this.user);
      this.setState(UserDetailsState.VIEW);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
        ]
      ],
      role: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  private loadUser(): void {
    if (this.userId) {
      this.store.dispatch(loadUser({ userId: this.userId }));
    }
  }

  private initializeUser(): void {
    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.user = user;
          this.form.patchValue(user);
        }
      });
  }

  private setState(state: UserDetailsState): void {
    this.state = state;
  }
}
