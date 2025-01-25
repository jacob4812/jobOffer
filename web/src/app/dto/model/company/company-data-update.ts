import { UserRole } from "../user/user/user-role";

export interface CompanyDataUpdate {
    id: number;
  companyName: string;
  phoneNumber: number;
  nip: number;
  userRole: UserRole;
  }