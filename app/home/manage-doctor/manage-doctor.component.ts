
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/services/doctor.service';
import { DialogDoctorComponent } from '../dialog-doctor/dialog-doctor.component';

@Component({
  selector: 'app-manage-doctor',
  templateUrl: './manage-doctor.component.html',
  styleUrls: ['./manage-doctor.component.css']
})
export class ManageDoctorComponent implements OnInit {
  title = 'DoctorAppoinmentSystem';
  displayedColumns: string[] = ['name', 'email', 'gender', 'dateOfBirth', 'specialization', 'mobileno', 'address', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: DoctorService) { }
  ngOnInit(): void {
    this.getAllDoctors();
  }

  openDialog() {
    this.dialog.open(DialogDoctorComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'saveDoctor') {
        this.getAllDoctors();
      }
    })
  }

  getAllDoctors() {
    this.api.getDoctorM()
      .subscribe({
        next: (doctor) => {
          this.dataSource = new MatTableDataSource(doctor);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(doctor);
        },
        error: (error) => {
          alert("Error while fetching the Records!! : " + error);
          console.log(error);
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

  editDoctor(row: any) {
    this.dialog.open(DialogDoctorComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'updateDoctor') {
        this.getAllDoctors();
      }
    })
  }

  deleteDoctor(id: number) {
    this.api.deleteDoctorM(id).subscribe({
      next: (res) => {
        alert("Doctor deleted successfully.")
        this.getAllDoctors();
      },
      error:()=>{
        alert("Error while deleting the record!! : ")
      }
    });
  }

}