
import { Component, OnInit } from '@angular/core';
import { BillForm } from 'src/app/models/bill-form';
import { AppointmentserviceService } from 'src/app/services/appointmentservice.service';


@Component({
  selector: 'app-billlist',
  templateUrl: './billlist.component.html',
  styleUrls: ['./billlist.component.css']
})
export class BilllistComponent implements OnInit {

  constructor(private apservice: AppointmentserviceService) { }

  stu!: BillForm[];

  ngOnInit(): void {

    this.apservice.billGetData().subscribe(list => {

      this.stu = list
    })
  }

  deleteDataById(id: number) {
    this.apservice.deletebillData(id).subscribe(data => {
      console.log(data);
      alert("Data is deleted");
    })
    window.location.reload();
  }

}