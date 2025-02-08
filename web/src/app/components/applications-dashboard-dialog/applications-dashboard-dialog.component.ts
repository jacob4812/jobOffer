import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'application-dialog',
  templateUrl: './applications-dashboard-dialog.component.html',
  styleUrls: ['./applications-dashboard-dialog.component.scss']
})
export class DashboardApplicationsDialogComponent {
  newStatus: string = '';  // Zmieniamy typ na string
  statusOptions: { label: string, value: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<DashboardApplicationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newStatus = data.currentStatus; 
    this.statusOptions = data.statusOptions;
  }

  onSave(): void {
    const formattedStatus = this.formatStatus(this.newStatus);  
    this.dialogRef.close(formattedStatus);
  }
  formatStatus(status: string): string {
    switch (status) {
      case 'In Progress':
        return 'IN_PROGRESS';
      case 'Approved':
        return 'APPROVED';
      case 'Rejected':
        return 'REJECTED';
     
      default:
        return status; 
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
