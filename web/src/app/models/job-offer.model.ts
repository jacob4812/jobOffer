import { Company } from "./company.model";
import { Experience } from "./experience";

export interface JobOffer {
  id: number;
  company: Company;
  title: string;
  location: string;
  contractType: string;
  salary: number;
  timeAgo: string;
  description: string;
  offerExperience: Experience[]; 
  // technologies: string;
}
