import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model';
import { ShareService } from 'src/app/service/share.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  constructor(private service:ShareService) { }

  EmployeeList:Array<Employee>=[];

  ModalTitle:string="";
 
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      EmployeeID:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
  }

  editClick(item:Employee)
  {
    console.log(item);
  }

  deleteClick(item:Employee){
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(item.EmployeeID).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }



  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
    });
  }

}