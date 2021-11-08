import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DepartmentComponent } from './department/department.component';
import { DisplayComponent } from './display/display.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path:'',component:DisplayComponent},
{path:'employee',component:EmployeeComponent},
{path:'department',component:DepartmentComponent},
{path:'addDepartment',component:AddDepartmentComponent},
{path:'addEmployee',component:AddEmployeeComponent},
{path:'edit-employee/:id',component:EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
