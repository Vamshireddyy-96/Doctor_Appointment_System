import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public url: string = "http://localhost:3000/patient";
  constructor(private _http: HttpClient) { }


  // Post Method For Add Patient
  postPatient(data: any) {
    return this._http.post(this.url, data);

  }

  // Get Method For All Patient
  getPatient() {
    return this._http.get<any>(this.url).pipe(map((res: any) => {
      return res
    }))
  }

  // Put Method For Update Patient
  putPatient(data: any, id: number) {
    return this._http.put<any>(this.url+"/" + id, data).pipe(map((res: any) => {
      return res
    }))
  }

  // Delete Method For Update Patient
  deletePatient(id: number) {
    return this._http.delete<any>(this.url+"/"+ id).pipe(map((res: any) => {
      return res
    }))
  }

}