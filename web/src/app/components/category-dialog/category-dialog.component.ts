import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  template: `
    <h2>Kategorie</h2>
    <mat-list>
      <mat-list-item *ngFor="let category of categories">
        <mat-checkbox [checked]="data.selectedCategories.includes(category)"
                      (change)="toggleSelection(category, $event.checked)">
          {{ category }}
        </mat-checkbox>
      </mat-list-item>
    </mat-list>
    <button mat-button (click)="close()">Zatwierdź</button>
  `,
  styles: ['mat-list { max-height: 80vh; overflow: auto; }']
})
export class CategoryDialogComponent {
  categories = [
    'Administracja', 'Analiza', 'Back-Office', 'Biznes Manager', 'Dane', 'Zarządzanie danymi',
    'Projektowanie', 'DevOps', 'Finanse', 'HR', 'Infrastruktura', 'Bezpieczeństwo infrastruktury', 
    'Integracja', 'Marketing', 'Operacje', 'Inne', 'Zarządzanie produktem', 'Manager produktu', 
    'Zarządzanie projektem', 'Rekrutacja', 'Bezpieczeństwo', 'Rozwój oprogramowania', 'Testowanie'
  ];

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedCategories: string[] }
  ) {
    dialogRef.disableClose = true;
    if (!data.selectedCategories) {
        data.selectedCategories = [];
      }
  }

  toggleSelection(category: string, isSelected: boolean) {
    if (isSelected) {
      this.data.selectedCategories.push(category);
    } else {
      const index = this.data.selectedCategories.indexOf(category);
      if (index >= 0) {
        this.data.selectedCategories.splice(index, 1);
      }
    }
  }

  close() {
    this.dialogRef.close(this.data.selectedCategories);
  }
}
