import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { DoctorComponent } from './home/doctor/doctor.component';
import { PatientComponent } from './home/patient/patient.component';
import { AppointmentComponent } from './home/appointment/appointment.component';
import { BillComponent } from './home/bill/bill.component';
import { BilllistComponent } from './home/billlist/billlist.component';
import { ManagePatientComponent } from './home/manage-patient/manage-patient.component';
import { ManageDoctorComponent } from './home/manage-doctor/manage-doctor.component';
import { BillManageComponent } from './home/bill-manage/bill-manage.component';



const routes: Routes = [
  { path: '',redirectTo: 'homepage',  pathMatch: 'full'},
  { path: 'homepage',component:HomepageComponent}, 
  { path: 'login',component:LoginComponent}, 
  { path: 'register',component:RegisterComponent},
  { path: 'doctor',component:DoctorComponent},
  { path: 'patient',component:PatientComponent},
  { path: 'appointment',component:AppointmentComponent},
  { path: 'bill',component:BillComponent},
  { path: 'billlist',component:BilllistComponent},
  { path: 'manage-patient',component:ManagePatientComponent},
  { path: 'manage-doctor',component:ManageDoctorComponent},
  { path: 'bill-manage',component:BillManageComponent}

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//Guards Will Activate later 
/* 
{ path:  'product/:id, canActivate:[ExampleGuard], component:  ProductDetailComponent}
class MyGuard implements CanActivate {
  canActivate() {
    return true;
  }
} */



