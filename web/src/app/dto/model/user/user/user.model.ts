import { UserRole } from "./user-role";

export interface User {
    id: number;
  login: string;
  phoneNumber:number;
  userRole: UserRole;
  }
