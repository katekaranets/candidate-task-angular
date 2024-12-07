import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/assets/mock_users.json');
  }

  getUser(id: number): Observable<any> {
    return this.http.get<User[]>('/assets/mock_users.json')
      .pipe(
        map(users => users.find(user => +user.id === id))
      )
  }
}
