import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchService } from 'src/services/searchService/search.service';

@Component({
  selector: 'app-experience-dialog',
  templateUrl:'./experience-dialog.component.html',
  styles: ['mat-list { overflow: auto; }']
})
export class ExperienceDialogComponent {
  experienceLevels = ['INTERN', 'JUNIOR', 'MID', 'SENIOR', 'EXPERT'];

  constructor(
    public dialogRef: MatDialogRef<ExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedExperienceLevels: string[] },private searchService: SearchService
  ) {
    dialogRef.disableClose = true;
    if (!this.data.selectedExperienceLevels) {
      this.data.selectedExperienceLevels = [];
    }
  }

  toggleSelection(level: string, isSelected: boolean) {
    if (isSelected) {
      this.data.selectedExperienceLevels.push(level);
    } else {
      const index = this.data.selectedExperienceLevels.indexOf(level);
      if (index >= 0) {
        this.data.selectedExperienceLevels.splice(index, 1);
      }
    }
  }

  close() {
    
    this.dialogRef.close(this.data.selectedExperienceLevels); 
  }
}
