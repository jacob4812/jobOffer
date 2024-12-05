import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApplyJobComponent>
  ) { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.data.cv = file;
    }
  }

  onSubmit() {
    this.dialogRef.close(this.data);
  }
}
