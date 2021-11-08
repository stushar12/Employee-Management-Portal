import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../model';
import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  newDepartment:Department={
    DepartmentID:1,
    DepartmentName:""
  }
  DepartmentForm:FormGroup
  constructor(private service:ShareService,private router:Router) 
  {
    this.DepartmentForm = new FormGroup({
      'Name': new FormControl('', Validators.required)
    })
  }



  ngOnInit(): void {
  }

  submitName(){
    Object.keys(this.DepartmentForm.controls).forEach(field => {
      const control = this.DepartmentForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });


    if(this.DepartmentForm.valid){
      console.log(this.DepartmentForm.value);

      this.newDepartment.DepartmentID=1;
      this.newDepartment.DepartmentName=this.DepartmentForm.value.Name;
      this.service.addDepartment(this.newDepartment).subscribe(() => {
        this.router.navigate(['/department'])
      },() => {
        alert("Something Went Wrong"+"\n"+"Please try again.")
      })
      this.DepartmentForm.reset();
    } 
  }
 }