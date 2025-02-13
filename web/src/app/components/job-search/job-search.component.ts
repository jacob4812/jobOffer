import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { ExperienceDialogComponent } from '../experience-dialog/experience-dialog.component';
import { SearchService } from 'src/services/searchService/search.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private searchService: SearchService
  ) {
    this.searchForm = this.fb.group({
      title: [''],
      location: [''],
      position: [[]],
      salaryMin: [],
      technologies: [[]],
      experience: [[]],
      description: []
    });
  }


  onSearch() {
    const searchCriteria = this.searchForm.value;
    this.searchService.updateSearchCriteria(searchCriteria);

  }


  onFilterChange() {
    const experienceFilter = this.searchForm.get('experience').value;
    const technologyFilter = this.searchForm.get('technologies').value;
    const positionFilter = this.searchForm.get('position').value;
    this.searchService.updateExperienceFilter(experienceFilter);
    this.searchService.updateTechnologyFilter(technologyFilter);
    this.searchService.updatePositionFilter(positionFilter);
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: { selectedPositionsLevels: this.searchForm.get('position').value },
      width: '100vw',
      height: '100vh',
    });

    dialogRef.afterClosed().subscribe(selectedPosition => {
      if (selectedPosition) {
        this.searchForm.get('position').setValue(selectedPosition);
        this.onFilterChange();

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
        this.onFilterChange();

      }
    });
  }


  openExperienceDialog() {
    const dialogRef = this.dialog.open(ExperienceDialogComponent, {
      data: { selectedExperienceLevels: this.searchForm.get('experience').value },
      width: '100vw',
      height: '100vh',
    });

    dialogRef.afterClosed().subscribe(selectedExperience => {
      if (selectedExperience) {
        this.searchForm.get('experience').setValue(selectedExperience);
        this.onFilterChange();

      }
    });
  }

  resetFilters() {
    this.searchForm.patchValue({
      title: '',
      location: '',
      salaryMin: null,
      description: '',
      position: [],
      technologies: [],
      experience: []
    });

    this.searchService.updateExperienceFilter([]);
    this.searchService.updatePositionFilter([]);
    this.searchService.updateTechnologyFilter([]);
    this.searchService.updateSearchCriteria(null);

  }


}
