import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../../../services/offers/offer.service';

import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { ExperienceDialogComponent } from '../experience-dialog/experience-dialog.component';
import { Company } from 'src/app/models/company.model';
import { Experience } from 'src/app/models/experience';
import { Technology } from 'src/app/models/technology';
import { Position } from 'src/app/models/position';

@Component({
  selector: 'app-job-detail-dialog-dashboard',
  templateUrl: './job-detail-dialog-dashboard.component.html',
  styleUrls: ['./job-detail-dialog-dashboard.component.scss']
})
export class DashboardJobDetailDialogComponent {
  editForm: FormGroup;
  company: Company;
   experienceOptions: { label: string ,value: string }[] = [];
   technologyOptions: { label: string ,value: string }[] = [];
   positionOptions: { label: string ,value: string }[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private offerService: OfferService,

  ) {
    this.experienceOptions = Object.keys(Experience).map(key => ({
      label: key,
      value: Experience[key as keyof typeof Experience]
    }));
    this.technologyOptions = Object.keys(Technology).map(key => ({
      label: key,
      value: Technology[key as keyof typeof Technology]
    }));
    this.positionOptions = Object.keys(Position).map(key => ({
      label: key,
      value: Position[key as keyof typeof Position]
    }));
    this.editForm = this.fb.group({
      id: [data.id],
      company:[data.company],
      title: [data.title || '', Validators.required],
      location: [data.location || '', Validators.required],
      contractType: [data.contractType || '', Validators.required],
      salaryMin: [data.salaryMin || '', [Validators.required, Validators.pattern('^[><0-9\\s]*(PLN|Zł)?$')]],
      salaryMax: [data.salaryMax || '', [Validators.required, Validators.pattern('^[><0-9\\s]*(PLN|Zł)?$')]],
      expirationDate: [data.expirationDate || ''],
      description: [data.description || ''],
      offerExperience: [data.offerExperience || []],
      offerTechnology: [data.offerTechnology || []],
      offerPosition: [data.offerPosition]
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedJob = this.editForm.value;


      this.offerService.editJobOffer(updatedJob).subscribe({
        next: (updatedOffer) => {

          alert('Oferta została zaktualizowana!');
          this.dialog.closeAll();
        },
        error: (err) => {
          console.error('Błąd podczas edycji oferty:', err);
          alert('Nie udało się zaktualizować oferty.');
        }
      });
    }
  }
  validateNumberInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;


    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }



  }
}
