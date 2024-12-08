import { UserRole } from "./role";
import { UserStatus } from "./status";

export interface UserFilters {
  name: string;
  role: UserRole | string;
  status: UserStatus | string;
}