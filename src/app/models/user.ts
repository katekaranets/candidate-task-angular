import { UserRole } from "./role";
import { UserStatus } from "./status";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joining_date: Date | number;
}
