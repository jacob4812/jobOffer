import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {SplitButtonModule} from "primeng/splitbutton";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";

import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {JobListComponent} from "./components/job-list/job-list.component";
import {JobDetailDialogComponent} from "./components/job-detail-dialog/job-detail-dialog.component";
import {JobOfferComponent} from "./components/job-offer/job-offer.component";
import {JobSearchComponent} from "./components/job-search/job-search.component";
import {MatDialogActions, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DialogService} from "primeng/dynamicdialog";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    JobListComponent,
    JobDetailDialogComponent,
    JobOfferComponent,
    JobSearchComponent
],providers: [MessageService,DialogService],
  bootstrap: [AppComponent],

  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    SplitButtonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ToastModule,
    MatDialogActions,
    MatDialogModule,
    MatButtonModule,
    PaginatorModule
  ],
})
export class AppModule { }
