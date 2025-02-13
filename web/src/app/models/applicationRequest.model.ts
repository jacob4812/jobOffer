import { Status } from "./status";

export interface ApplicationRequest {
    userId: number;
    offerId: number;
    companyId: number;
    file: File | null; 
    fileName: string;
    status: Status;
    data?: Uint8Array;
    
  }