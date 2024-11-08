// technology-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-technology-dialog',
  template: `
    <h2>Technologie</h2>
    <mat-list>
      <mat-list-item *ngFor="let technology of technologies">
        <mat-checkbox [checked]="data.selectedTechnologies.includes(technology)"
                      (change)="toggleSelection(technology, $event.checked)">
          {{ technology }}
        </mat-checkbox>
      </mat-list-item>
    </mat-list>
    <button mat-button (click)="close()">Zatwierdź</button>
  `,
  styles: ['mat-list { overflow: auto; }']
})
export class TechnologyDialogComponent {
  technologies = [
    'JavaScript', 'TypeScript', 'Java', 'Python', 'C#', 'Ruby', 'PHP', 'Go', 'Swift', 'Kotlin', 'C++', 'Rust', 'UX/UI', 'Angular', 'Spring', 'SQL', 'API', 'Linux'
  ];

  constructor(
    public dialogRef: MatDialogRef<TechnologyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedTechnologies: string[] }
  ) {
    dialogRef.disableClose = true;
    if (!this.data.selectedTechnologies) {
      this.data.selectedTechnologies = [];
    }
  }


  toggleSelection(technology: string, isSelected: boolean) {
    if (isSelected) {
      this.data.selectedTechnologies.push(technology);
    } else {
      const index = this.data.selectedTechnologies.indexOf(technology);
      if (index >= 0) {
        this.data.selectedTechnologies.splice(index, 1);
      }
    }
  }

  close() {
    this.dialogRef.close(this.data.selectedTechnologies);
  }
}
