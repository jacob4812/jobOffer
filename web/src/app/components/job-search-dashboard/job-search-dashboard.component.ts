import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-job-search-dashboard',
  templateUrl: './job-search-dashboard.component.html',
  styleUrls: ['./job-search-dashboard.component.scss']
})
export class DashboardJobSearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      position: [''],
      location: ['']
    });
  }

  onSearch() {
    const searchCriteria = this.searchForm.value;
    console.log(searchCriteria);
    // TODO
  }
}
