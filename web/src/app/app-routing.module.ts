import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterCompanyComponent } from './components/registercompany/registercompany.component';
import { MyProfileComponent } from './components/myprofile/myprofile.component';
import { NgModule } from "@angular/core";
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registercompany', component: RegisterCompanyComponent },
  { path: 'myprofile', component: MyProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
