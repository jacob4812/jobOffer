import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-detail-dialog',
  templateUrl: './job-detail-dialog.component.html',
  styleUrls: ['./job-detail-dialog.component.scss']
})
export class JobDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
