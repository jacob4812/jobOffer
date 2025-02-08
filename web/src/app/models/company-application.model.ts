import { Status } from "./status";

export interface CompanyApplication {
  id:number;
    name: string;
    email: string;
    cv: string;
    position: string;
    location: string;
    applicationDate: Date;
    status: Status;
  }