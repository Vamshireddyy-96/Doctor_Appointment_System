import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientModel } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  formValue!: FormGroup;

  patientobj: PatientModel = new PatientModel;

  allpatient: any;

  btnUpdateShow: boolean = false;

  btnSaveShow: boolean = true;


  constructor(private formBuilder: FormBuilder, private patientservice: PatientService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
    
      pName: [''],
      pPhoneNo: [''],
      pAddress: [''],
      pDob: [''],
      pEmail: [''],
      pSex: [''],
      pAge: ['']

    })
    this.AllPatient();
  }

  AddPatient() {
    this.patientobj.id= new Date().getTime();
    this.patientobj.pName = this.formValue.value.pName
    this.patientobj.pPhoneNo = this.formValue.value.pPhoneNo;
    this.patientobj.pAddress = this.formValue.value.pAddress;
    this.patientobj.pDob = this.formValue.value.pDob;
    this.patientobj.pEmail = this.formValue.value.pEmail;
    this.patientobj.pSex = this.formValue.value.pSex;
    this.patientobj.pAge = this.formValue.value.pAge;
   // this.patientservice.postPatient(this.patientobj);
    
 alert(this.patientobj.pAge+""+ this.patientobj.pSex+" "+ this.patientobj.id+" "+this.patientobj.pName+" ");
    this.patientservice.postPatient(this.patientobj).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => {
        alert("Error")
        console.log(e)
      },
      complete: () => {
        console.log('complete')
        alert("Data Saved")
        this.AllPatient();
        this.formValue.reset();
      }
    }) 

  }



  AllPatient() {
    this.patientservice.getPatient().subscribe(res => {
      this.allpatient = res;
    })
  }

  EditPatient(data: any) {
    this.formValue.controls['pName'].setValue(data.pName);
    this.formValue.controls['pPhoneNo'].setValue(data.pPhoneNo);
    this.formValue.controls['pAddress'].setValue(data.pAddress);
    this.formValue.controls['pDob'].setValue(data.pDob);
    this.formValue.controls['pEmail'].setValue(data.pEmail);
    this.formValue.controls['pSex'].setValue(data.pSex);
    this.formValue.controls['pAge'].setValue(data.pAge);
    this.patientobj.id = data.id;
    alert("In Edi Patient"+this.patientobj.id);
    this.UpdateShowBtn();
  }

  UpdatePatient() { 

    this.patientobj.pName = this.formValue.value.pName;
    this.patientobj.pPhoneNo = this.formValue.value.pPhoneNo;
    this.patientobj.pAddress = this.formValue.value.pAddress;
    this.patientobj.pDob = this.formValue.value.pDob;
    this.patientobj.pEmail = this.formValue.value.pEmail;
    this.patientobj.pSex = this.formValue.value.pSex;
    this.patientobj.pAge = this.formValue.value.pAge;
    alert(this.patientobj.id+""+this.patientobj.pName)
  this.patientservice.putPatient(this.patientobj, this.patientobj.id).subscribe(res => {
    alert("Data Updated");
    this.AllPatient();
  this.SaveShowBtn();
})
  }


DeletePatient(data: any) {
  alert(data.id);
  this.patientservice.deletePatient(data.id).subscribe(res => {
    alert("Record Deleted");
    this.AllPatient();
  })

}
UpdateShowBtn() {
  this.btnUpdateShow = true;
  this.btnSaveShow = false;
}
SaveShowBtn() {
  this.btnUpdateShow = false;
  this.btnSaveShow = true;
}


GenId(){
  const time: number = Date.now();
  return time;
}
}
