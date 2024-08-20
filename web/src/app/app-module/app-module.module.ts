import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "../app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModuleModule { }
