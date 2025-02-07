import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { ExperienceDialogComponent } from '../experience-dialog/experience-dialog.component';
import { HttpClient } from '@angular/common/http';
import { SearchService } from 'src/services/searchService/search.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent {
  searchForm: FormGroup;
  selectedExperience: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient,
    private searchService: SearchService
  ) {
    this.searchForm = this.fb.group({
      title: [''],
      location: [''],
      category: [[]],
      salary: [],
      technologies: [[]],
      experience: [[]],
      description: []
    });
  }

  onSearch() {
    const searchCriteria = this.searchForm.value;
    const filteredSearchCriteria = {
      title: searchCriteria.title || null,
      location: searchCriteria.location || null,
      salary: searchCriteria.salary || null,
      category: searchCriteria.category && searchCriteria.category.length > 0 ? searchCriteria.category : null,
      technologies: searchCriteria.technologies && searchCriteria.technologies.length > 0 ? searchCriteria.technologies : null,
      experience: searchCriteria.experience && searchCriteria.experience.length > 0 ? searchCriteria.experience : null,
      description: searchCriteria.description && searchCriteria.description.length > 0 ? searchCriteria.description : null
    };

    // Przekazywanie kryteriów wyszukiwania do serwisu
    this.searchService.searchJobOffers(searchCriteria);
    this.searchService.updateSearchCriteria(searchCriteria);
    console.log(searchCriteria);

    // Jeśli masz komponent, który powinien otrzymać te dane:
    // this.searchService.setSearchCriteria(filteredSearchCriteria);
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
    const experienceFilter = this.searchForm.value;
    const dialogRef = this.dialog.open(ExperienceDialogComponent, {
      data: { selectedExperienceLevels: this.searchForm.get('experience').value },
      width: '100vw',
      height: '100vh',
    });
    dialogRef.afterClosed().subscribe(selectedExperience => {
      if (selectedExperience) {
        this.searchForm.get('experience').setValue(selectedExperience);
        this.searchService.searchJobOffersWithFilters(selectedExperience);
        this.searchService.updateExperienceFilter(selectedExperience);
        console.log("experience " + selectedExperience);
        console.log(experienceFilter);
      }
    });
  }

  resetFilters() {
    this.searchForm.reset({
      title: '',
      location: '',
      category: [],
      salary: null,
      technologies: [],
      experience: [],
      description: ''
    });

    window.location.reload(); // Opcjonalnie możesz usunąć to, aby zachować stan w aplikacji
  }

 
}
