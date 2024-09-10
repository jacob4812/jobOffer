import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'application-dialog',
  templateUrl: './applications-dashboard-dialog.component.html',
  styleUrls: ['./applications-dashboard-dialog.component.scss']
})
export class DashboardApplicationsDialogComponent {
  newStatus: string;

  constructor(
    public dialogRef: MatDialogRef<DashboardApplicationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentStatus: string }
  ) {
    this.newStatus = data.currentStatus;
  }

  onSave(): void {
    this.dialogRef.close(this.newStatus);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
