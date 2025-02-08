import { Company } from "./company.model";
import { Experience } from "./experience";
import { Position } from "./position";
import { Technology } from "./technology";

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
  offerTechnology: Technology[];
  offerPosition: Position[];
}
