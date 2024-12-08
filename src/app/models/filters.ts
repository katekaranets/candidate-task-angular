import { UserRole } from "./role";
import { UserStatus } from "./status";

export interface UserFilters {
  name: string;
  role: UserRole | undefined;
  status: UserStatus | undefined;
}