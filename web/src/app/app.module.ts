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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
],providers: [MessageService],
  bootstrap: [AppComponent],

  imports:[
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    SplitButtonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ToastModule
  ],
})
export class AppModule { }
