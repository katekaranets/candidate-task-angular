import { Injectable } from "@angular/core";

import { User } from "../models/user";
import { UserFilters } from "../models/filters";

@Injectable({
  providedIn: 'root'
})
export class UserFilterService {
  filterUsers(users: Partial<User>[], filters: UserFilters): Partial<User>[] {
    const { name, status, role } = filters;

    return users.filter(user => {
      const matchesName = name ? user.name?.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesRole = role ? user.role === role : true;
      const matchesStatus = status ? user.status === status : true;

      return matchesName && matchesStatus && matchesRole;
    });
  }
}
