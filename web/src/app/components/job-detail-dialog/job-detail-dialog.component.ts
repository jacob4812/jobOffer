import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './job-detail-dialog.component.html',
  styleUrls: ['./job-detail-dialog.component.scss']
})
export class JobDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
