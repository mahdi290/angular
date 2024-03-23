import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { AddhomeserviceComponent } from './addhomeservice/addhomeservice.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  { path: 'service', component: ServiceComponent },
  { path: 'homeservice', component: AddhomeserviceComponent },
  // Route for '/employee'
  // Route for '/employee'
  { path: 'home', component: HomeComponent }, // Route for '/home'
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root path to '/home'
  { path: '**', redirectTo: '/home' }// Redirect any other unknown paths to '/home'


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
