import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardApplicationsDialogComponent } from '../applications-dashboard-dialog/applications-dashboard-dialog.component';
import { CompanyApplicationService } from 'src/services/application/comapny-application.service';
import { Page } from 'src/app/models/page.model';
import {PaginatorState} from "primeng/paginator";
import { CompanyApplication } from 'src/app/models/company-application.model';


@Component({
  selector: 'applications-dashboard-component',
  templateUrl: './applications-dashboard.component.html',
  styleUrls: ['./applications-dashboard.component.scss']
})
export class DashboardApplicationsComponent implements OnInit {
  applications: CompanyApplication[] = [];
  first = 0;
  rows = 10;
  totalRecords = 0;
  totalPages = 0;
  

  sortColumn: keyof CompanyApplication = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  constructor(public dialog: MatDialog,private comapnyApplicationService:CompanyApplicationService) { }
  ngOnInit(): void {
    this.getCompanyApplications();
    
  }

  get sortedApplications() {
    return this.applications.slice().sort((a, b) => {
      const aValue = a[this.sortColumn] || '';
      const bValue = b[this.sortColumn] || '';
      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : (aValue < bValue ? -1 : 0);
      } else {
        return aValue < bValue ? 1 : (aValue > bValue ? -1 : 0);
      }
    });
  }

  sort(column: keyof CompanyApplication) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  openStatusDialog(application: CompanyApplication): void {
    const dialogRef = this.dialog.open(DashboardApplicationsDialogComponent, {
      width: '250px',
      data: { currentStatus: application.status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        application.status = result;
      }
    });
  }
  getCompanyApplications(event?: PaginatorState){
    const page = event ? Math.floor(event.first / event.rows) : 0;
    const size = event ? event.rows : this.rows;
    const userId = Number(localStorage.getItem('idUser')) || null;

    this.comapnyApplicationService.readCompanyApplications(userId,page, size).subscribe((response: Page<CompanyApplication>) => {
      this.applications = response.content;
      this.totalRecords = response.totalElements;
      this.totalPages = response.totalPages;

      if (page >= this.totalPages && this.totalPages > 0) {
        this.first = (this.totalPages - 1) * this.rows;
        this.getCompanyApplications({ first: this.first, rows: this.rows });
      }
    });
  }
}
