import { UserRole } from "./role";
import { UserStatus } from "./status";

export interface User {
  id: number | null;
  name: string;
  email: string;
  role: UserRole | string;
  status: UserStatus | string;
  joining_date?: number | null;
}
