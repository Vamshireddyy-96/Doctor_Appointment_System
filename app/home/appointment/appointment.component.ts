import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { BillForm } from 'src/app/models/bill-form';
import { BillModel } from 'src/app/models/bill.model';

import { AppointmentserviceService } from 'src/app/services/appointmentservice.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  patientname: string = '';
  doctorname: string = '';
  designation: string = '';
  doctorAvailablity: string = '';
  timeslot: string = '';
  description: string = '';
  //billmodel:BillModel=new BillModel;
  billmodel: BillForm = new BillForm;
  apmodel: AppointmentModel = new AppointmentModel;

  constructor(private fb: FormBuilder, private apservice: AppointmentserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  // Save Appointment 
  saveAppointment() {
    if (this.validateform() == false) {
      return;
    }
    this.apmodel.id = new Date().getTime();
    this.apmodel.patientname = this.patientname;
    this.apmodel.doctorname = this.patientname;
    this.apmodel.description = this.description;
    this.apmodel.designation = this.designation;
    this.apmodel.doctorAvailablity = this.doctorAvailablity;
    this.apmodel.timeslot = this.timeslot;
    this.apservice.postAppointment(this.apmodel).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => {
        alert("Error")
        console.log(e)
        this.router.navigate(['/appointment']);
      },
      complete: () => {
        console.log('complete')
        alert("Processing for Bill Payment")
      }
    })
    this.billgeneration(this.apmodel.patientname);
    this.patientname = '';
    this.doctorname = '';
    this.designation = '';
    this.doctorAvailablity = '';
    this.timeslot = '';
    this.description = '';
  }
// Bill Generation 
  billgeneration(patientname: string) {
    const getRandomId = (min = 1000, max = 500000) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num;
    };

    this.billmodel.id = new Date().getTime();
    this.billmodel.billNo = getRandomId();
    this.billmodel.patientName = patientname;
    this.billmodel.amount = 500;
    this.apservice.postBill(this.billmodel).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => {
        alert("Error")
        console.log(e)
        this.router.navigate(['/appointment']);
      },
      complete: () => {
        console.log('complete')
        alert("Please Pay Bill through Card")
        this.router.navigate(['/bill']);
      }
    })
  }
  //validate Form
  validateform() {

    if (this.patientname == '') {
      alert('Please enter Patient Name');
      return false;
    }
    if (this.doctorname == '') {
      alert('Please enter Doctor Name');
      return false;
    }

    if (this.designation == '') {
      alert('Please enter Designation ');
      return false;
    }
    if (this.doctorAvailablity == '') {
      alert('Please enter Doctor Availability');
      return false;
    }
    if (this.timeslot == '') {
      alert('Please enter Timeslot');
      return false;
    }
    if (this.description == '') {
      alert('Please enter Description');
      return false;
    }
    return true;

  }

}