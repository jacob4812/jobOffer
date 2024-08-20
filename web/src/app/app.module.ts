import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";



@NgModule({
  declarations: [],
  bootstrap: [AppComponent], imports:[
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AppModule { }
