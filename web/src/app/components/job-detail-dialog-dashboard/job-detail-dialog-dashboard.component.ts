import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-detail-dialog-dashboard',
  templateUrl: './job-detail-dialog-dashboard.component.html',
  styleUrls: ['./job-detail-dialog-dashboard.component.scss']
})
export class DashboardJobDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
