import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './Components/Student/GridStudent/students.component';
import { ViewStudentComponent } from './Components/Student/view-student/view-student.component';

const routes: Routes = [
  {
    path:'',
    component:StudentsComponent
  },
  {
    path:'',
    component:StudentsComponent
  },
  {
    path:'students/:id',
    component:ViewStudentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
