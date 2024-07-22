import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Models/UIModels/Gender.Model';
import { Student } from 'src/app/Models/UIModels/Student.Models';
import { GenderService } from 'src/app/Services/Genders/gender.service';
import { StudentService } from 'src/app/Services/Students/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
studentId: string | null | undefined;
student: Student={
  id:'',
  firstname:'',
  lastname:'',
  dateOfBirth:'',
  email:'',
  mobile:0,
  genderId:'',
  profileImageUrl:'',
  gender:{
    id:'',
    description:''
  },
  adress: {
    id:'',
    physicalAdress:'',
    postalAddress:'',
  }

};
isNewStudent=false;
header='';
displayProfileImageUrl='';
genderList:Gender[]=[];
  /**
   *
   */
@ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;
  constructor(private readonly studentService:StudentService,
    private readonly route:ActivatedRoute,
    private readonly genderService:GenderService,
    private snackbar:MatSnackBar,
    private router:Router) {

  }
  ngOnInit(): void {
      this.route.paramMap.subscribe(
          (params )=>{

              this.studentId= params.get('id');
              if(this.studentId){

                if(this.studentId.toLowerCase()==='Add'.toLowerCase()){
                 // -> new Student Functionnality
                 this.isNewStudent=true;
                 this.header='Add New Student';
                 this.setImage();
                } else{
                  // -> Existing Student Functionnality
                  this.isNewStudent=false;
                  this.header='Edit Student';
                  this.studentService.getStudent(this.studentId)
                  .subscribe(
                    (successResponse)=>{this.student=successResponse;
                    this.setImage();
                    },
                    (errorResponse)=>{this.setImage();}

                  );
                }




              this.genderService.getGenderList()
              .subscribe(
                (successResponse)=>{this.genderList=successResponse;}

              );
              }



          }
      );
  }
  onUpdate(): void{
    //console.log(this.student)
    //call Student Service to Update Student

    if(this.studentDetailsForm?.form.valid ) {
        this.studentService.updateStudent(this.student.id,this.student)
        .subscribe(
          (successResponse)=>
          {/*show notification*/
          this.snackbar.open('Student updated successfully',
          undefined,{duration:2000})
          },

          (errorResponse)=>{console.log(errorResponse)}


        );
    }

  }
  onDelete():void{
    //call Student Service to delete Student
    this.studentService.DeleteStudent(this.student.id)
    .subscribe(
      (successResponse)=>
      {/*show notification*/
      this.snackbar.open('Student Deleted successfully',
      undefined,{duration:2000});
      setTimeout(()=>{
        this.router.navigateByUrl('');

      },2000);
      },

      (errorResponse)=>{/*log it*/}


    );
  }
  onAdd():void{
   if(this.studentDetailsForm?.form.valid ) {
    // Submit Form date to api
    this.studentService.addStudent(this.student)
    .subscribe(
      (successResponse)=>
      {
        //console.log(successResponse);
        this.snackbar.open('Student Added successfully',
      undefined,{duration:2000});
      setTimeout(()=>{
        this.router.navigateByUrl('');

      },2000);
      },

      (errorResponse)=>
      { console.log(errorResponse);}


    );
   }



  }
  private setImage(): void{
    if(this.student.profileImageUrl){
      //Fecth the Image by url
      this.displayProfileImageUrl= this.studentService.getImagePath(this.student.profileImageUrl) ;

    }
    else{
      //Display a default
      this.displayProfileImageUrl='/assets/user.png';

    }
  }
  uploadImage(event:any):void{
    if(this.studentId){
     const file:File= event.target.files[0];
      this.studentService.uploadImage(this.student.id,file)
      .subscribe(
        (successResponse)=>{
          this.student.profileImageUrl=successResponse;
          this.setImage();
          this.snackbar.open('Profile Image updated ',
          undefined,{duration:2000});
        },
        (errorResponse)=>{}
      );
    }

  }
}
