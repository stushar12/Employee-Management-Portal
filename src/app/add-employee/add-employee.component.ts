import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee,Department } from '../model';
import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
  DepartmentsList:Array<Department>=[];
  PhotoFileName:string="";
  PhotoFilePath:string="";

  newEmployee:Employee={
    EmployeeID:1,
    EmployeeName:"",
    DateOfJoining:"",
    Department:"",
  }
  employeeForm:FormGroup
  constructor(private service:ShareService,private router:Router) 
  {

    this.employeeForm = new FormGroup({
      'userName': new FormControl('', [Validators.required]),
      'Department': new FormControl('', Validators.required),
      'dojoining': new FormControl('', [Validators.required])
    })
  }



  ngOnInit(): void {
    this.loadDepartmentList();
  }


  loadDepartmentList()
  {
    this.service.getAllDepartmentNames().subscribe((data:Array<Department>)=>{
      this.DepartmentsList=data;
    });
  }

  submituser()
  {
    Object.keys(this.employeeForm.controls).forEach(field => {
      const control = this.employeeForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });


    if(this.employeeForm.valid){

      this.newEmployee.EmployeeName=this.employeeForm.value.userName
      this.newEmployee.Department=this.employeeForm.value.Department
      this.newEmployee.DateOfJoining=this.employeeForm.value.dojoining

      if(this.newEmployee.EmployeeName!="" && this.newEmployee.Department!="" && this.newEmployee.DateOfJoining!="")
      {
        this.service.addEmployee(this.newEmployee).subscribe(() => {
          this.employeeForm.reset();
         this.router.navigate(['/employee'])
        },() => {
          alert("Something Went Wrong"+"\n"+"Please try again.")
        })
      }
      else
      {
        alert("Enter all the fields")
      }
      }
      
  }
 }