import { UserRole } from "./user-role";

export interface User {
    id: number;
  login: string;
  phoneNumber:number;
  name:string;
  surname:string;
  email:string;
  userRole: UserRole;
  }
