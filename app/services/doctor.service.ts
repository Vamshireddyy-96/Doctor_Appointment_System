import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService{
constructor(private _http:HttpClient) { }

// Post Method For Add User
postDoctor(data:any)
{
  return this._http.post<any>("http://localhost:3000/doctor",data).pipe(map((res:any)=> {
    return res
  }))
}

  // Get Method For All User
  getDoctor()
  {
    return this._http.get<any>("http://localhost:3000/doctor").pipe(map((res:any)=> {
      return res
    }))
  }

/*   checkDoctor(email:string)
  {
    return this._http.get<any>("http://localhost:3000/doctor/"+email).pipe(map((res:any)=> {
      return res
    }))
  } */

    // Put Method For Update User
putDoctor(data:any, id:number)
{
  return this._http.put<any>("http://localhost:3000/doctor/" + id,data).pipe(map((res:any)=> {
    return res
  }))
}

// Delete Method For Update User
deleteDoctor(id:number)
{
  return this._http.delete<any>("http://localhost:3000/doctor/" + id).pipe(map((res:any)=> {
    return res
  }))
}
  
//Manage Doctor with different field 

getDoctorM() {
  return this._http.get<any>('http://localhost:3000/doctorList/');
}
postDoctorM(data: any) {
  return this._http.post<any>("http://localhost:3000/doctorList/", data);
}

updateDoctorM(data: any, id: number) {
  return this._http.put<any>("http://localhost:3000/doctorList/"+ id, data);
}

deleteDoctorM(id: number) {
  return this._http.delete<any>("http://localhost:3000/doctorList/"+ id);
}

}

