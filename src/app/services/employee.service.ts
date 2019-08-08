import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import { Department } from '../department/models/departement-model';
import { Employee } from '../department/models/employee-model';
import { Injectable } from '@angular/core';

@Injectable ({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  formData: Employee;

  readonly APIURL = 'http://localhost:8080/AngularAPI/API/controller.php?req';
  getEmpList(): Observable<Employee[]>{

    return this.http.get<Employee[]>(this.APIURL + '=get-allemp');
  }
  addEmployee(data: Employee)
  {
    return this.http.post(this.APIURL+'=createemp', data);
  }

  deleteEmployee(id: number){
  return this.http.delete(this.APIURL+'=deleteemp&EmployeeID='+id);
  }

  updateEmployee(emp: Employee)
  {
return this.http.put(this.APIURL+'=updateemp', emp);
  }

  getDepDropDownValues(): Observable<any>{
    return this.http.get<Department[]>(this.APIURL + '=get-alldept');
  }

  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string){
    this._listners.next(filterBy);
  }


  
}