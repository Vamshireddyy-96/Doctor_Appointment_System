import { Component,OnInit, ViewChild  } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PatientService } from 'src/app/services/patient.service';
import { DialogComponent } from '../dialogPatient/dialog.component';

@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.css']
})
export class ManagePatientComponent implements OnInit  {
  title = 'Angularpatientmodule';
  displayedColumns: string[] = ['pName','pPhoneNo','pAddress','pDob','pEmail','pSex','pAge','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : PatientService){

  }
  ngOnInit(): void {
    this.getAllPatient();
  }
 
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllPatient();
      }
    })
  }
  getAllPatient(){
    this.api.getPatient()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:()=>{
        alert("Error while fetching the records!!")
      }
  })
}
editPatient(row : any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllPatient();
    }

  })
}

deletePatient(id:number){
 this.api.deletePatient(id)
 .subscribe({

  next:(res)=>{
    alert("patient deleted successfully")
    this.getAllPatient();
  },
  error:()=>{
    alert("Error while deleting the records!!")
  }
  
  
 })
  
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}

