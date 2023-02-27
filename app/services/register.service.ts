import { Injectable } from '@angular/core';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { PatientModel } from '../models/patient.model';
import { PatientService } from './patient.service';
import { DoctorModel } from '../models/doctor.model';
import { DoctorService } from './doctor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private fireauth: AngularFireAuth, private router: Router, private patientservice: PatientService,public doctorservice :DoctorService) { }

  patientobj: PatientModel = new PatientModel;
  doctorobj:DoctorModel=new DoctorModel;
  // login method
  login(email: string, password: string) {
    //Admin is harcoded currently 
    
    if (email == 'yogeshkale2309@gmail.com' && password == '123456') {
      this.router.navigate(['/patient']);
      return;
    }else{

    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
      // Email verification is turned On currently
       if (res.user?.emailVerified == true) {
        this.router.navigate(['/appointment']);
      } if (res.user?.emailVerified == false) {
        alert('Please verify your email to Login');
        this.router.navigate(['/login']);
      } 
      let jsonObj=this.doctorservice.getDoctor();
      jsonObj.forEach(function(key) {
        console.log('Key : ' + key + ', Value : ' + jsonObj[key])
      /*   alert(key+jsonObj[key]); */
      })      
   /*    this.router.navigate(['/appointment']); */

    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }
  }

  // register method 
  register(name: string, email: string, password: string, gender: string, contactNo: string, dob: string, role: string, designation: string, address: string, age: string) {

    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      this.sendEmailForVarification(res.user);
      if (role == 'Patient') {
        this.patientobj.id = new Date().getTime();
        this.patientobj.pName = name;
        this.patientobj.pPhoneNo = contactNo;
        this.patientobj.pAddress = address;
        this.patientobj.pDob = dob;
        this.patientobj.pEmail = email;
        this.patientobj.pSex = gender;
        this.patientobj.pAge = this.calculateAge(dob, age).toString();
       
        this.patientservice.postPatient(this.patientobj).subscribe({
          next: (v) => { console.log(v) },
          error: (e) => {
            alert("Error")
            console.log(e)
          },
          complete: () => {
            console.log('complete')
            alert("Data Saved")
            this.router.navigate(['/login']);
         
          }
        })
      }

      //crating Doctor and Registraion for Doctor 

      if (role == 'Doctor') {
        this.doctorobj.id = new Date().getTime();
        this.doctorobj.dName = name;
        this.doctorobj.dPhoneNo = contactNo;
        this.doctorobj.dAddress = address;
        this.doctorobj.dDob = dob;
        this.doctorobj.dEmail = email;
        this.doctorobj.dSex = gender;
        this.doctorobj.dDesignation = designation;
        this.doctorobj.dAge = this.calculateAge(dob, age).toString();
        this.doctorservice.postDoctor(this.doctorobj).subscribe({
          next: (v) => { console.log(v) },
          error: (e) => {
            alert("Error")
            console.log(e)
          },
          complete: () => {
            console.log('complete')
            alert("Data Saved")
            this.router.navigate(['/login']);        
          }
        })

      }

    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }


  // email varification
  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      alert('Email Verification send successfully')
      //this.router.navigate(['/verify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }
  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }
  // forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/appointment']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }

  calculateAge(dob, age) {
    //convert date again to type Date

    const bdate = new Date(dob);

    const timeDiff = Math.abs(Date.now() - bdate.getTime());
    return age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  }
}

