import { Injectable } from "@angular/core";

import { User } from "../models/user";

@Injectable()
export class UserFilterService {

  filterUsers(users: User[], filters: any): User[] {
    const { name, status, role } = filters;

    return users.filter(user => {
      const matchesName = name ? user.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesRole = role ? user.role === role : true;
      const matchesStatus = status ? user.status === status : true;

      return matchesName && matchesStatus && matchesRole;
    });
  }
}