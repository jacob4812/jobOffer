import { Status } from "./status";

export interface CompanyApplication {
  id:number;
    name: string;
    email: string;
    fileName: string;
    position: string;
    location: string;
    applicationDate: Date;
    status: Status;
  }