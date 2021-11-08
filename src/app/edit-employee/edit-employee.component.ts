import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Employee } from '../model';
import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  DepartmentsList:Array<Department>=[];
  id:number=0;
  employeeForm:FormGroup;
  newEmployee:Employee={
    EmployeeID:1,
    EmployeeName:"",
    DateOfJoining:"",
    Department:"",
  }

  constructor(private activeRouter:ActivatedRoute,private service:ShareService,private router:Router) 
  {

    this.employeeForm = new FormGroup({
      'EmployeeName': new FormControl('', [Validators.required]),
      'Department': new FormControl('', Validators.required),
      'DateOfJoining': new FormControl('', [Validators.required])
    })
  }


  ngOnInit(): void 
  {
    this.activeRouter.params.subscribe((paramsData) => {
      this.id = paramsData['id']
      // console.log(paramsData);
      this.service.getEmpListbyId(paramsData['id']).subscribe((data) => {
         console.log(data[0].Department);
        
        this.employeeForm.patchValue(data[0])

        this.employeeForm.value.Department=data[0].Department
        // console.log(this.employeeForm.value);
        // console.log(this.id);
      })
    })
    this.loadDepartmentList();
  }

  loadDepartmentList()
  {
    this.service.getAllDepartmentNames().subscribe((data:Array<Department>)=>{
      this.DepartmentsList=data;
    });
  }


  submituser(){
    Object.keys(this.employeeForm.controls).forEach(field => {
      const control = this.employeeForm.get(field);
      if (control instanceof FormControl) 
      {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.employeeForm.valid){

      this.newEmployee.EmployeeID=this.id
      this.newEmployee.EmployeeName=this.employeeForm.value.EmployeeName
      this.newEmployee.Department=this.employeeForm.value.Department
      this.newEmployee.DateOfJoining=this.employeeForm.value.DateOfJoining


      
      if(this.newEmployee.EmployeeName!="" && this.newEmployee.Department!="" && this.newEmployee.DateOfJoining!="")
      {
        this.service.updateEmployee(this.newEmployee).subscribe(() => {
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
