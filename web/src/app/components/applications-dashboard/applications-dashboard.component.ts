import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardApplicationsDialogComponent } from '../applications-dashboard-dialog/applications-dashboard-dialog.component';

interface Application {
  name: string;
  email: string;
  cv: string;
  position: string;
  location: string;
  when: string;
  status: string;
}

@Component({
  selector: 'applications-dashboard-component',
  templateUrl: './applications-dashboard.component.html',
  styleUrls: ['./applications-dashboard.component.scss']
})
export class DashboardApplicationsComponent {
  applications: Application[] = [ //dla testu na sztywno
    {
      name: 'Jan Nowak',
      email: 'jan.nowak@example.com',
      cv: 'Link do CV',
      position: 'Frontend Developer',
      location: 'Warszawa',
      when: '2024-09-10',
      status: 'In progress'
    },
    {
      name: 'Kasia Nowak',
      email: 'Kasia.nowak@example.com',
      cv: 'Link do CV',
      position: 'Backend Developer',
      location: 'Poznań',
      when: '2023-11-9',
      status: 'Hired'
    }
  ];

  sortColumn: keyof Application = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(public dialog: MatDialog) { }

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

  sort(column: keyof Application) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  openStatusDialog(application: Application): void {
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
}
