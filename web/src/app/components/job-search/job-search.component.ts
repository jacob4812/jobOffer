import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { ExperienceDialogComponent } from '../experience-dialog/experience-dialog.component';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.searchForm = this.fb.group({
      position: [''],
      location: [''],
      category: [[]],
      salary: [null],
      technologies: [[]],
      experience: [[]]
    });
  }

  onSearch() {
    const searchCriteria = this.searchForm.value;
    console.log(searchCriteria);
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: { selectedCategories: this.searchForm.get('category').value },
      width: '100vw',
      height: '100vh',
    });
    dialogRef.afterClosed().subscribe(selectedCategories => {
      if (selectedCategories) {
        this.searchForm.get('category').setValue(selectedCategories); 
      }
    });
  }

  openTechnologyDialog() {
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
      data: { selectedTechnologies: this.searchForm.get('technologies').value },
      width: '100vw',
      height: '100vh',
    });
    dialogRef.afterClosed().subscribe(selectedTechnologies => {
      if (selectedTechnologies) {
        this.searchForm.get('technologies').setValue(selectedTechnologies);
      }
    });
  }

  openExperienceDialog() {
    const dialogRef = this.dialog.open(ExperienceDialogComponent, {
      data: { selectedExperience: this.searchForm.get('experience').value },
      width: '100vw',
      height: '100vh',
    });
    dialogRef.afterClosed().subscribe(selectedExperience => {
      if (selectedExperience) {
        this.searchForm.get('experience').setValue(selectedExperience);
      }
    });
  }
}
