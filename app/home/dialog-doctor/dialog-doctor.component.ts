import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-doctor',
  templateUrl: './dialog-doctor.component.html',
  styleUrls: ['./dialog-doctor.component.css']
})
export class DialogDoctorComponent  implements OnInit {
  genderList=['Male', 'Female'];
  doctorForm !: FormGroup;
  actionBtn :string = 'Save';
  email = new FormControl('', [Validators.required, Validators.email]);
  mobileno = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30),
  Validators.pattern("^[.a-zA-Z ]+$")]);
  dateOfBirth: any;
  gender: any;
  address: any;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMob() {
    if (this.mobileno.hasError('required')) {
      return 'You must enter a value';
    }
    return this.mobileno.hasError('mobileno') ? 'Enter 10 digit mobile number.' : '';
  }
  getErrorName() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    return this.name.hasError('name') ? 'Enter only alphabets with space.' : '';
  }

  constructor(private formBuilder: FormBuilder, 
    private doctor: DoctorService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<DialogDoctorComponent>) {

  }
  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({

      name: this.name,
      email: this.email,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      specialization: ['', Validators.required],
      mobileno: this.mobileno,
      address: this.address
    });
    if(this.editData){
      this.actionBtn='Update';
      this.doctorForm.controls['name'].setValue(this.editData.name);
      this.doctorForm.controls['email'].setValue(this.editData.email);
      this.doctorForm.controls['gender'].setValue(this.editData.gender);
      this.doctorForm.controls['dateOfBirth'].setValue(this.editData.dateOfBirth);
      this.doctorForm.controls['specialization'].setValue(this.editData.specialization);
      this.doctorForm.controls['mobileno'].setValue(this.editData.mobileno);
      this.doctorForm.controls['address'].setValue(this.editData.address);

    }
    console.log(this.editData);
  }

  saveDoctor() {
    if(!this.editData){
      if (this.doctorForm.valid) {
        this.doctor.postDoctorM(this.doctorForm.value)
          .subscribe({
            next: () => {
              alert("Doctor data has been saved successfully.");
              this.doctorForm.reset();
              this.dialogRef.close('saveDoctor');
            },
            error: (err) => {
              alert("Error while saving doctor data.")
            }
          })
        this.doctorForm.reset();
  
      }
      console.log(this.doctorForm.value);
      console.log("Doctor saved successfully.");
    }
    else{
      this.updateDoctor();
    }
  }

  updateDoctor(){
    alert(this.doctorForm.value);
    this.doctor.updateDoctorM(this.doctorForm.value,this.editData.id)  //, this.editData.id this.doctorForm.value
    .subscribe({
      next: (res) => {
        alert("Doctor data has been updated successfully.");
        this.doctorForm.reset();
        this.dialogRef.close('updateDoctor');
      },
      error(){
        alert("Error while updating doctor data!!");

      }
    })
  }
}
