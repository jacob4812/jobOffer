import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SplitButtonModule } from "primeng/splitbutton";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { JobListComponent } from "./components/job-list/job-list.component";
import { JobDetailDialogComponent } from "./components/job-detail-dialog/job-detail-dialog.component";
import { JobOfferComponent } from "./components/job-offer/job-offer.component";
import { JobSearchComponent } from "./components/job-search/job-search.component";
import { HeaderComponent } from "./components/header/header.component";
import { MatDialogActions, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogService } from "primeng/dynamicdialog";
import { PaginatorModule } from "primeng/paginator";
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProfileComponent } from './components/myprofile/myprofile.component';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';
import { CompanyProfileDialogComponent } from './components/companyprofile-dialog/companyprofile-dialog.component';
import { CompanyProfileComponent } from './components/companyprofile/companyprofile.component';
import { CvComponent } from './components/cv/cv.component';
import { ChangeprofileComponent } from './components/changeprofile/changeprofile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MyApplicationsComponent } from './components/myapplications/myapplications.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardJobListComponent } from './components/job-list-dashboard/job-list-dashboard.component';
import { DashboardJobDetailDialogComponent } from './components/job-detail-dialog-dashboard/job-detail-dialog-dashboard.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { DashboardApplicationsComponent } from './components/applications-dashboard/applications-dashboard.component';
import { DashboardApplicationsDialogComponent } from './components/applications-dashboard-dialog/applications-dashboard-dialog.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { TechnologyDialogComponent } from './components/technology-dialog/technology-dialog.component';
import { ExperienceDialogComponent } from './components/experience-dialog/experience-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    JobListComponent,
    JobDetailDialogComponent,
    JobOfferComponent,
    JobSearchComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    MyProfileComponent,
    ProfileDialogComponent,
    CompanyProfileDialogComponent,
    CompanyProfileComponent,
    CvComponent,
    ChangeprofileComponent,
    MyApplicationsComponent,
    DashboardComponent,
    DashboardJobListComponent,
    DashboardJobDetailDialogComponent,
    AddJobComponent,
    DashboardApplicationsComponent,
    DashboardApplicationsDialogComponent,
    CategoryDialogComponent,
    TechnologyDialogComponent,
    ExperienceDialogComponent,
    ApplyJobComponent
  ], providers: [MessageService, DialogService, provideAnimationsAsync()],
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
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatCheckboxModule,
    PaginatorModule
  ],
})
export class AppModule { }
