import { Component,OnInit } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import {PaginatorState} from "primeng/paginator";
import { ApplicationService } from 'src/services/application/application.service';
import { Page } from 'src/app/models/page.model';
@Component({
  selector: 'myapplications-component',
  templateUrl: './myapplications.component.html',
  styleUrls: ['./myapplications.component.scss']
})
export class MyApplicationsComponent implements OnInit{
  applications: Application[] = [];
  first = 0;
  rows = 10;
  totalRecords = 0;
  totalPages = 0;
    constructor(private applicationService:ApplicationService) {}

    ngOnInit(): void {
      this.getMyApplications();
      
    }
  getMyApplications(event?: PaginatorState){
      const page = event ? Math.floor(event.first / event.rows) : 0;
      const size = event ? event.rows : this.rows;
      const userId = Number(localStorage.getItem('idUser')) || null;

      this.applicationService.readMyApplications(userId,page, size).subscribe((response: Page<Application>) => {
        this.applications = response.content;
        this.totalRecords = response.totalElements;
        this.totalPages = response.totalPages;
  
        if (page >= this.totalPages && this.totalPages > 0) {
          this.first = (this.totalPages - 1) * this.rows;
          this.getMyApplications({ first: this.first, rows: this.rows });
        }
      });
    }
}
