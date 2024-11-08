import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-profile-dialog',
  templateUrl: './companyprofile-dialog.component.html',
  styleUrls: ['./companyprofile-dialog.component.scss']
})
export class CompanyProfileDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CompanyProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: { companyname: string, nip: string } }
  ) {dialogRef.disableClose = true; }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.user);
  }
}
