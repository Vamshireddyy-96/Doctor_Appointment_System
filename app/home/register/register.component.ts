import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientModel } from 'src/app/models/patient.model';

import { AuthService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  contactNo: string = '';
  dob: string = '';
  role: string = '';
  designation: string = '';
  address: string = '';
  age: string = '';


  ngOnInit(): void {
  }

  constructor(private FormBuilder: FormBuilder, private auth: AuthService) { }
  // Registration 
  register() {
    //Validate fields

    if (this.validateform() == false) {
      return;
    }

    //Check register 
    this.auth.register(this.name, this.email, this.password, this.gender, this.contactNo, this.dob, this.role, this.designation, this.address, this.age);

    this.name = '';
    this.email = '';
    this.password = '';
    this.gender = '';
    this.contactNo = '';
    this.dob = '';
    this.role = '';
    this.designation = '';
    this.address = '';
    this.age = '';
  }
  validateform() {
    var phoneno = /^\d{10}$/;
    if (this.name == '') {
      alert('Please enter Name');
      return false;
    }
    if (this.email == '') {
      alert('Please enter Email');
      return false;
    }

    if (this.email != '') {
      const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      /*   const phone: RegExp = "^((\\+91-?)|0)?[0-9]{10}$;  */
      const result: boolean = expression.test(this.email); // true
      //  alert(result);
      if (result == false) {
        alert('Email address is not in proper formated ');
        return false;
      }

    }
    if (this.password == '' || this.password.length < 6) {
      alert('Please enter Password at least 6 character');
      return false;
    }
    if (this.gender == '') {
      alert('Please enter Gender');
      return false;
    }


    if (!this.contactNo.match(phoneno) || this.contactNo == '') {
      alert("Please enter correct Phone No");
      return false;
    }


    if (this.dob == '') {
      alert('Please enter Date of Birth');
      return false;
    }
    if (this.role == '') {
      alert('Please enter role');
      return false;
    }
    if (this.designation == '') {
      alert('Please enter Designation');
      return false;
    }
    return true;

  }




}
