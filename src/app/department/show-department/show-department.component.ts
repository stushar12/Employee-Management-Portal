import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/model';
import { ShareService } from 'src/app/service/share.service';


@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  constructor(private service:ShareService) { }


  DepartmentList:Array<Department>=[]

  ModalTitle:string="";
  ActivateAddEditDepComp:boolean=false;
  dep:Department={
    DepartmentID:0,
    DepartmentName:""
  };

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:Array<Department>=[];
  val:String=""

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick()
  {
    // this.val=this.DepartmentName;

    // this.service.addDepartment(this.val).subscribe(res=>{
    //   alert(res.toString());
    // });


    this.dep={
      DepartmentID:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true;

  }

  editClick(item:Department){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }

  deleteClick(item:Department){
    if(confirm('Are you sure??')){
      this.service.deleteDepartment(item.DepartmentID).subscribe(data=>{
        
        this.refreshDepList();
        alert(data.toString());
      })
    }
  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }


  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
      this.DepartmentList=data;
      this.DepartmentListWithoutFilter=data;
    });
  }

  FilterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el){
        return el.DepartmentID.toString().toLowerCase().includes(
          DepartmentIdFilter.toString().trim().toLowerCase()
        )&&
        el.DepartmentName.toString().toLowerCase().includes(
          DepartmentNameFilter.toString().trim().toLowerCase()
        )
    });
  }


}
