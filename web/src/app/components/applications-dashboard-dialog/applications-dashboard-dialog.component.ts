import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'application-dialog',
  templateUrl: './applications-dashboard-dialog.component.html',
  styleUrls: ['./applications-dashboard-dialog.component.scss']
})
export class DashboardApplicationsDialogComponent {
  newStatus: string[] = [];
  status = Object.values(Status);
  constructor(
    public dialogRef: MatDialogRef<DashboardApplicationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentStatus: string }
  ) {
    dialogRef.disableClose = true;
    this.newStatus = data.currentStatus ? [data.currentStatus] : [];
  }

  onSave(): void {
    this.dialogRef.close(this.newStatus);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
