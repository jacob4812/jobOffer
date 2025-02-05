import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Experience } from 'src/app/models/experience';


@Component({
  selector: 'add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent  {

 
  experienceOptions: { label: string, value: string }[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddJobComponent>
  ) {
    this.experienceOptions = Object.keys(Experience).map(key => ({
      label: key,
      value: Experience[key as keyof typeof Experience]
    }));
   
    console.log('Dialog Data:', this.data);
   }
  

  onSubmit() {
    console.log(this.data)
    this.dialogRef.close(this.data);
  }
}
