import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BillForm } from 'src/app/models/bill-form';
import { AppointmentserviceService } from 'src/app/services/appointmentservice.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  constructor(private fb: FormBuilder, private apservice: AppointmentserviceService, private router: Router) { }

  stu!: BillForm[]
  billform!: FormGroup;
  namepattern!: "^[a-zA-Z ]{2,20}$";

  ngOnInit(): void {
    this.billform = this.fb.group({
      id: [''],
      billNo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      patientName: ['', [Validators.required, Validators.pattern(this.namepattern)]],
      amount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    })
  }
  
  onSubmit() {
    alert("Payment is done");
    if (this.billform.valid) {
      this.apservice.SaveBill(this.billform.value).subscribe();
      alert("Payment is done");
      window.location.reload();
    }
  }

  payDone() {
    alert("Bill Payment done check Bill List")
    this.router.navigate(['/billlist']);
  }
}



