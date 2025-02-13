import { Status } from "./status";

export interface ApplicationRequest {
    userId: number;
    offerId: number;
    companyId: number;
    file: File | null; // Dodajemy opcjonalne pole dla pliku CV
    fileName: string;
    status: Status;
  }