import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Experience } from 'src/app/models/experience';
import { Position } from 'src/app/models/position';
import { Technology } from 'src/app/models/technology';


@Component({
  selector: 'add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent  {


  experienceOptions: { label: string, value: string }[] = [];
  technologyOptions: { label: string, value: string }[] = [];
  positionOptions: { label: string, value: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddJobComponent>
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
   }


  onSubmit() {
    console.log(this.data)
    this.dialogRef.close(this.data);
  }
  validateNumberInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
    const regex = /^[0-9]*$/;
    if (!regex.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }



  }
}
