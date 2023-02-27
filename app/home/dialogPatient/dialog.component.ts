
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  genderList = ["Male", "Female","other"]
  patientForm!: FormGroup;
  actionbtn : string = "Save";
 

  constructor(private formBuilder:FormBuilder, private api : PatientService, @Inject(MAT_DIALOG_DATA) public editData: any ,  private dialogRef : MatDialogRef<DialogComponent>){}
 
    ngOnInit(): void {
    this.patientForm=this.formBuilder.group({
      pName:['',Validators.required],
      pPhoneNo:['',Validators.required],
      pAddress:['',Validators.required],
      pDob:['',Validators.required],
      pEmail:['',Validators.required],
      pSex:['',Validators.required],
      pAge:['',Validators.required]
    })
    
    if(this.editData){
      this.actionbtn = "Update"; 
      this.patientForm.controls['pName'].setValue(this.editData.pName);
      this.patientForm.controls['pPhoneNo'].setValue(this.editData.pPhoneNo);
      this.patientForm.controls['pAddress'].setValue(this.editData.pAddress);
      this.patientForm.controls['pDob'].setValue(this.editData.pDob);
      this.patientForm.controls['pEmail'].setValue(this.editData.pEmail);
      this.patientForm.controls['pSex'].setValue(this.editData.pSex);
      this.patientForm.controls['pAge'].setValue(this.editData.pAge);
    }
  }

  addPatient(){
    if(!this.editData){
      if(this.patientForm.valid){
        this.api.postPatient(this.patientForm.value)
        .subscribe({
          next:(res)=>{
            alert("patient added successfully")
            this.patientForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the patient")
          }
        })
  
      }
    }
    else{
      this.updatePatient()
    }
   }
   updatePatient()
   {
    this.api.putPatient(this.patientForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("patient updated  successfully")
        this.patientForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the patient")
      }
    })
   }
}
