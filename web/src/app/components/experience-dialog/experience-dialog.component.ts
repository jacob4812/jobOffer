import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-experience-dialog',
  template: `
    <h2>Poziom Doświadczenia</h2>
    <mat-list>
      <mat-list-item *ngFor="let level of experienceLevels">
        <mat-checkbox [checked]="data.selectedExperienceLevels.includes(level)"
                      (change)="toggleSelection(level, $event.checked)">
          {{ level }}
        </mat-checkbox>
      </mat-list-item>
    </mat-list>
    <button mat-button (click)="close()">Zatwierdź</button>
  `,
  styles: ['mat-list { overflow: auto; }']
})
export class ExperienceDialogComponent {
  experienceLevels = [
    'Intern' ,'Junior', 'Mid', 'Senior', 'Expert'
  ];

  constructor(
    public dialogRef: MatDialogRef<ExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedExperienceLevels: string[] }
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
