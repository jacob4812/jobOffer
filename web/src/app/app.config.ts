import {ApplicationConfig, EnvironmentProviders} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
