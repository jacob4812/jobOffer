import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchComponent } from '../job-search/job-search.component';
import { JobListComponent } from '../job-list/job-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, JobSearchComponent, JobListComponent],
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent { }
