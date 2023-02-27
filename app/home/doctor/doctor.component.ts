import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorModel } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent  implements OnInit {

  formValue!: FormGroup;
  doctorobj: DoctorModel = new DoctorModel;
  alldoctor: any;
  btnUpdateShow: boolean = false;
  btnSaveShow: boolean = true;

  constructor(private formBuilder: FormBuilder, private api: DoctorService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      dName: [''],
      dAge: [''],
      dEmail: [''],
      dAddress: [''],
      dDesignation: [''],
      dPhoneNo: [''],
      dSex: [''],
      dDob: [''],

    })
    this.AllDoctor();
  }

  // Saving doctor in json File
  AddDoctor() {
    this.doctorobj.id= new Date().getTime();
    this.doctorobj.dAddress = this.formValue.value.dAddress;
    this.doctorobj.dDesignation = this.formValue.value.dDesignation;
    this.doctorobj.dName = this.formValue.value.dName;
    this.doctorobj.dEmail = this.formValue.value.dEmail;
    this.doctorobj.dDob = this.formValue.value.dDob;
    this.doctorobj.dSex = this.formValue.value.dSex;
    this.doctorobj.dPhoneNo = this.formValue.value.dPhoneNo;
    this.doctorobj.dAge = this.formValue.value.dAge;
    this.api.postDoctor(this.doctorobj).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => {
        alert("Error")
        console.log(e)
      },
      complete: () => {
        console.log('complete')
        alert("Data Saved")
        this.AllDoctor();
        this.formValue.reset();
      }
    }
    )

  }
  // Getting All doctor from json File
  AllDoctor() {
    this.api.getDoctor().subscribe(res => {
      this.alldoctor = res;
    })
  }

  // Edit doctor in json File
  EditDoctor(data: any) {
    this.formValue.controls['dName'].setValue(data.dName);
    this.formValue.controls['dDesignation'].setValue(data.dDesignation);
    this.formValue.controls['dAddress'].setValue(data.dAddress);
    this.formValue.controls['dEmail'].setValue(data.dEmail);
    this.formValue.controls['dDob'].setValue(data.dDob);
    this.formValue.controls['dAge'].setValue(data.dAge);
    this.formValue.controls['dPhoneNo'].setValue(data.dPhoneNo);
    this.formValue.controls['dSex'].setValue(data.dSex);
    this.formValue.controls['dDob'].setValue(data.dDob);
    this.doctorobj.id = data.id;
    this.UpdateShowBtn();

  }

  //// Update doctor from json File
  UpdateDoctor() {
    this.doctorobj.dAddress = this.formValue.value.dAddress;
    this.doctorobj.dDesignation = this.formValue.value.dDesignation;
    this.doctorobj.dName = this.formValue.value.dName;
    this.doctorobj.dEmail = this.formValue.value.dEmail;
    this.doctorobj.dDob = this.formValue.value.dDob;
    this.doctorobj.dSex = this.formValue.value.dSex;
    this.doctorobj.dPhoneNo = this.formValue.value.dPhoneNo;
    this.doctorobj.dAge = this.formValue.value.dAge;
    this.api.putDoctor(this.doctorobj, this.doctorobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllDoctor();
      this.SaveShowBtn();
    })


  }

  // Delete doctor
  DeleteDoctor(data: any) {
    this.api.deleteDoctor(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllDoctor();
    })

  }

  // Update Button
  UpdateShowBtn() {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }

  // SaveShowBtn Button
  SaveShowBtn() {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }

}

