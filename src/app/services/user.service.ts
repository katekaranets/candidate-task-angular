import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";

import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly localStorageKey = 'users';

  constructor(private http: HttpClient) {}

  // mock /users endpoint
  getUsers(): Observable<Partial<User>[]> {
    const storedUsers = this.loadFromLocalStorage();

    if (storedUsers) {
      return of(storedUsers);
    }

    return this.http.get<User[]>('/assets/mock_users.json').pipe(
      tap(users => this.saveToLocalStorage(users)),
      map(users => users.map(({ joining_date, ...rest }) => rest)),
      catchError(error => {
        console.error('Error loading users:', error);
        return throwError(() => new Error('Failed to load users'));
      })
    );
  }

  // mock /users/:id endpoint
  getUser(id: number): Observable<User> {
    const users = this.loadFromLocalStorage();

    if (users) {
      const user = users.find(user => +(user.id ?? 0) === id);
      if (user) {
        return of(user);
      }
      return throwError(() => new Error('User not found in local storage'));
    }
    return throwError(() => new Error('No users found in local storage'));
  }

  // Update a user in LocalStorage
  updateUser(id: number, updatedData: Partial<User>): Observable<User> {
    const users = this.loadFromLocalStorage();

    if (users) {
      const userIndex = users.findIndex(user => +(user.id ?? 0) === id);
      if (userIndex === -1) {
        return throwError(() => new Error('User not found for update'));
      }

      const updatedUser = { ...users[userIndex], ...updatedData };
      users[userIndex] = updatedUser;
      this.saveToLocalStorage(users);

      return of(updatedUser);
    }

    return throwError(() => new Error('No users found in local storage'));
  }

  private loadFromLocalStorage(): User[] | null {
    const raw = localStorage.getItem(this.localStorageKey);
    return raw ? JSON.parse(raw) : null;
  }

  private saveToLocalStorage(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
}
