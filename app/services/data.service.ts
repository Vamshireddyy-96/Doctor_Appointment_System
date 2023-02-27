import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
//import { PatientData, AppointmentData, DoctorData } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {}
/* 
  constructor(public http:HttpClient) { }
  url:string="http://localhost:3000/posts";
  patientData: PatientData[];
  appointmentData:AppointmentData[];
  doctorData: DoctorData[]

  GetPatientDatas() {
    return this.patientData;
  }
  AddPatient(newPatient: PatientData) {
    this.patientData.push(newPatient);
  }

  GetAppointmentDatas() {
   return this.appointmentData;
  }
  AddAppointment(newAppointment: AppointmentData) {
    this.appointmentData.push(newAppointment);
 }

 GetDoctorDatas() {
  return this.doctorData;
}
AddDoctor(newDoctor: DoctorData) {
  this.doctorData.push(newDoctor);
} */


