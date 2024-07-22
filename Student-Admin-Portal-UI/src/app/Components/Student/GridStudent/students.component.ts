import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/Models/UIModels/Student.Models';
import { StudentService } from 'src/app/Services/Students/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
/**
 *
 */
students : Student[]=[];
displayedColumns: string[] =
 ['firstname', 'lastname', 'dateOfBirth',
  'email','mobile','gender','edit'];
  dataSource:MatTableDataSource<Student>
  =new MatTableDataSource <Student>();
  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
filterString='';
constructor( private studentService:StudentService) {


}
ngOnInit():void{
  //Fetch Students
this.studentService.getStudents()
.subscribe({
  next:(successResponse)=>
  {
    //console.log(successResponse);

   //console.log(successResponse[0].firstname);
    this.students=successResponse;
    this.dataSource= new MatTableDataSource<Student>(this.students);
    if(this.matPaginator){
      this.dataSource.paginator=this.matPaginator;
      console.log("data source",this.dataSource)
    }
    if(this.matSort){
      this.dataSource.sort=this.matSort;
    }
  },
  error:(errorResponse)=>{
    console.log(errorResponse);
  }
}


);

}
filterStudents(){
  this.dataSource.filter=this.filterString.trim().toLowerCase();
}


}
