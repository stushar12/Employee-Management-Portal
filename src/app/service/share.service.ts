import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department, Employee } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

//https://cors-everywhere.herokuapp.com/
  readonly APIUrl="https://cors-everywhere.herokuapp.com/http://tushar12-001-site1.etempurl.com/api";

  constructor(private http:HttpClient) {}

    getDepList(){
      return this.http.get<Array<Department>>(this.APIUrl+'/department');
    }
  
    addDepartment(val:Department){
      return this.http.post(this.APIUrl+'/Department',val);
    }
  
    updateDepartment(val:Department){
      return this.http.put(this.APIUrl+'/Department',val);
    }
  
    deleteDepartment(id:number){
      return this.http.delete(this.APIUrl+'/Department/'+id);
    }
  
  
    getEmpList(){
      return this.http.get<Array<Employee>>(this.APIUrl+'/Employee');
    }

    getEmpListbyId(id:number){
      return this.http.get<any>(this.APIUrl+'/Employee/'+id);
    }
  
    addEmployee(val:Employee){
      return this.http.post(this.APIUrl+'/Employee',val);
    }
  
    updateEmployee(val:Employee){
      return this.http.put(this.APIUrl+'/Employee',val);
    }
  
    deleteEmployee(id:number){
      return this.http.delete(this.APIUrl+'/Employee/'+id);
    }
  
    getAllDepartmentNames(){
      return this.http.get<Array<Department>>(this.APIUrl+'/Employee/GetAllDepartmentNames');
    }

}
