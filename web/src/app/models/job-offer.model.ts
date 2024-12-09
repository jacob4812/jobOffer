import { Company } from "./company.model";

export interface JobOffer {
  id: number;
  company: Company;
  title: string;
  location: string;
  contractType: string;
  salary: number;
  timeAgo: string;
  description: string;
  // experience: string; 
  // technologies: string;
}
