import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/app/Models/ApiModels/Student.model';
import { UpdateStudentRequest } from 'src/app/Models/ApiModels/update-student-request.model';
import { AddStudentRequest } from 'src/app/Models/ApiModels/add-student-request.model';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
private baseApiUrl=environment.baseApiUrl;
  constructor( private httpClient : HttpClient) { }

  getStudents(): Observable <Student[]>{
   return  this.httpClient.get<Student[]>(this.baseApiUrl+'/students');
  }
  getStudent(studentId:string): Observable <Student>{
    return  this.httpClient.get<Student>(this.baseApiUrl+'/students/' + studentId);
   }
   updateStudent(studentId:string,StudentRequest:Student):Observable<Student>{

    const UpdateStudentRequest:UpdateStudentRequest={
      firstname:StudentRequest.firstname,
      lastname:StudentRequest.lastname,
      dateOfBirth:StudentRequest.dateOfBirth,
      email:StudentRequest.email,
      mobile:StudentRequest.mobile,
      genderId:StudentRequest.genderId,
      physicalAdress:StudentRequest.adress.physicalAdress,
      postalAddress:StudentRequest.adress.postalAddress

    }
   return  this.httpClient.put<Student>(this.baseApiUrl +'/students/' + studentId,UpdateStudentRequest)
   }
   DeleteStudent(studentId:string):Observable<Student>{
    return this.httpClient.delete<Student>(this.baseApiUrl +'/students/' + studentId);
   }
   addStudent(StudentRequest:Student):Observable<Student>{

    const addStudentRequest:AddStudentRequest={
      firstname:StudentRequest.firstname,
      lastname:StudentRequest.lastname,
      dateOfBirth:StudentRequest.dateOfBirth,
      email:StudentRequest.email,
      mobile:StudentRequest.mobile,
      genderId:StudentRequest.genderId,
      physicalAdress:StudentRequest.adress.physicalAdress,
      postalAddress:StudentRequest.adress.postalAddress

    }
   return  this.httpClient.post<Student>(this.baseApiUrl +'/students/add',addStudentRequest)

  }
  uploadImage(studentId:string,file:File)
   :Observable<any>{
    const formData= new FormData();
    formData.append("profileImage", file);
    return this.httpClient.post
    (this.baseApiUrl +'/students/'+ studentId
    +'/upload-image',formData,
    {responseType:'text'});

  }
  getImagePath(relativePath:string){
    return this.baseApiUrl+'/'+relativePath;

  }
}
