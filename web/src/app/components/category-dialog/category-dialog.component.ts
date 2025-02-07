import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchService } from 'src/services/searchService/search.service';

@Component({
  selector: 'app-category-dialog',
  template: `
    <h2>Kategorie</h2>
    <mat-list>
      <mat-list-item *ngFor="let position of positions">
        <mat-checkbox [checked]="data.selectedPositionsLevels.includes(position)"
                      (change)="toggleSelection(position, $event.checked)">
          {{ position }}
        </mat-checkbox>
      </mat-list-item>
    </mat-list>
    <button mat-button (click)="close()">Zatwierdź</button>
  `,
  styles: ['mat-list { max-height: 80vh; overflow: auto; }']
})
export class CategoryDialogComponent {
  positions = [
    'Administracja', 'Analiza', 'Back-Office', 'Biznes Manager', 'Dane', 'Zarządzanie danymi',
    'Projektowanie', 'DevOps', 'Testing', 'HR', 'BACKEND', 'Frontend', 
    'Integracja', 'Fullstack', 'Operacje', 'Inne', 'Zarządzanie produktem', 'PM', 
    'Zarządzanie projektem', 'Rekrutacja', 'Bezpieczeństwo', 'Rozwój oprogramowania'
  ]; 
  
  

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedPositionsLevels: string[] },private searchService: SearchService
  ) {
    dialogRef.disableClose = true;
    if (!data.selectedPositionsLevels) {
        data.selectedPositionsLevels = [];
      }
  }

  toggleSelection(position: string, isSelected: boolean) {
    if (isSelected) {
      this.data.selectedPositionsLevels.push(position);
    } else {
      const index = this.data.selectedPositionsLevels.indexOf(position);
      if (index >= 0) {
        this.data.selectedPositionsLevels.splice(index, 1);
      }
    }
  }

  close() {
    this.dialogRef.close(this.data.selectedPositionsLevels);
  }
}
