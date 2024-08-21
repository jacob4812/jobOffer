import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailDialogComponent } from '../job-detail-dialog/job-detail-dialog.component';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styles: []
})
export class JobListComponent {
  jobOffers = [
    {
      logo: 'assets/logo192.png',
      company: 'Firma #1',
      title: 'Software Engineer',
      location: 'Warszawa',
      contractType: 'Kontrakt B2B',
      salary: 'PLN 50-55k',
      timeAgo: '30 min temu',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      logo: 'assets/logo192.png',
      company: 'Firma #2',
      title: 'IT Specialist',
      location: 'Gniezno',
      contractType: 'Kontrakt B2B',
      salary: 'PLN 50-55k',
      timeAgo: '35 min temu',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    ,{
      logo: 'assets/logo192.png',
      company: 'Firma #2',
      title: 'IT Specialist',
      location: 'Gniezno',
      contractType: 'Kontrakt B2B',
      salary: 'PLN 50-55k',
      timeAgo: '35 min temu',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },{
      logo: 'assets/logo192.png',
      company: 'Firma #2',
      title: 'IT Specialist',
      location: 'Gniezno',
      contractType: 'Kontrakt B2B',
      salary: 'PLN 50-55k',
      timeAgo: '35 min temu',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },{
      logo: 'assets/logo192.png',
      company: 'Firma #2',
      title: 'IT Specialist',
      location: 'Gniezno',
      contractType: 'Kontrakt B2B',
      salary: 'PLN 50-55k',
      timeAgo: '35 min temu',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  ];

  constructor(public dialog: MatDialog) { }

  openJobDetailDialog(offer: any) {
    this.dialog.open(JobDetailDialogComponent, {
      data: offer
    });
  }
}
