import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './home/register/register.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './home/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './home/homepage/homepage.component';
import { DoctorComponent } from './home/doctor/doctor.component';
import { PatientComponent } from './home/patient/patient.component';
import { AppointmentComponent } from './home/appointment/appointment.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillComponent } from './home/bill/bill.component';
import { BilllistComponent } from './home/billlist/billlist.component';
import { ManagePatientComponent } from './home/manage-patient/manage-patient.component';
import { ManageDoctorComponent } from './home/manage-doctor/manage-doctor.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from './home/dialogPatient/dialog.component';
import { DialogDoctorComponent } from './home/dialog-doctor/dialog-doctor.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BillManageComponent } from './home/bill-manage/bill-manage.component';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    DoctorComponent,
    PatientComponent,
    AppointmentComponent,
    BillComponent,
    BilllistComponent,
    ManagePatientComponent,
    ManageDoctorComponent,
    DialogComponent,
    DialogDoctorComponent,
    BillManageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    QRCodeModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
