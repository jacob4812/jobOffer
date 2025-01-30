import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { ExperienceDialogComponent } from '../experience-dialog/experience-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog,private http: HttpClient) {
    this.searchForm = this.fb.group({
      position: [''],
      location: [''],
      category: [[]],
      salary: [],
      technologies: [[]],
      experience: [[]]
    });
  }

  onSearch() {
    const searchCriteria = this.searchForm.value;
    const filteredSearchCriteria = {
        position: searchCriteria.position || null,
        location: searchCriteria.location || null,
        salary: searchCriteria.salary || null,
        category: searchCriteria.category && searchCriteria.category.length > 0 ? searchCriteria.category : null,
        technologies: searchCriteria.technologies && searchCriteria.technologies.length > 0 ? searchCriteria.technologies : null,
        experience: searchCriteria.experience && searchCriteria.experience.length > 0 ? searchCriteria.experience : null
      };
    this.searchJobOffers(searchCriteria);
    console.log(searchCriteria)
  }
searchJobOffers(searchData: any) {
     let url = 'http://localhost:8080/api/offer/search?';

      if (searchData.position) {
        url += `description=${searchData.position}&`;
      }

      if (searchData.location) {
        url += `location=${searchData.location}&`;
      }

      if (searchData.salary) {
        url += `salary=${searchData.salary}&`;
      }

      // Usuwanie ostatniego & (jeśli jest obecne)
      url = url.endsWith('&') ? url.slice(0, -1) : url;

      this.http.get(url).subscribe(
        (response: any) => {
          console.log('Found job offers:', response);
        },
        (error) => {
          console.error('Error searching job offers:', error);
        }
      );
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
