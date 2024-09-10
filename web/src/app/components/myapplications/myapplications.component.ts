import { Component } from '@angular/core';

@Component({
  selector: 'myapplications-component',
  templateUrl: './myapplications.component.html',
  styleUrls: ['./myapplications.component.scss']
})
export class MyApplicationsComponent {
  // Przykład
  applications = [
    {
      companyName: 'Firma1',
      position: 'Software Engineer',
      location: 'Warszawa',
      status: 'In Progress'
    },
    {
      companyName: 'Firma2',
      position: 'Frontend Developer',
      location: 'Kraków',
      status: 'Rejected'
    }
  ];
}
