import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentModel } from '../models/appointment.model';
import { BillForm } from '../models/bill-form';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentserviceService {

  constructor(public http: HttpClient) { }
  url: string = "http://localhost:3000";


  SaveBill(stu: BillForm) {
    return this.http.post<BillForm>(this.url + "/billlist", stu);
  }

  billGetData(): Observable<BillForm[]> {
    return this.http.get<BillForm[]>(this.url + "/billlist");
  }

  deletebillData(id: number) {
    return this.http.delete(this.url + "/billlist/" + id);
  }


  SaveBookAppointment(ap: AppointmentModel) {
    return this.http.post<any>(this.url + "/appointment", ap);
  }
  postAppointment(data: any) {
    return this.http.post<any>("http://localhost:3000/appointment", data);
  }
  updateAppointmentr(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/appointment" + id, data);
  }
  deleteappoitment(id: number) {
    return this.http.delete<any>("http://localhost:3000/appointment" + id);
  }
  getAppointment(data: any) {
    return 
    this.http.get<any>("http://localhost:3000/appointment");
  }

  //post Bill 
  postBill(data: any) {
    return this.http.post<any>("http://localhost:3000/billlist", data);
  }

}



