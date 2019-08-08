import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import { Department } from '../department/models/departement-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  formData: Department;

  readonly APIURL = 'http://localhost:8080/AngularAPI/API/controller.php?req';
  getDepList(): Observable<Department[]>{

    return this.http.get<Department[]>(this.APIURL + '=get-alldept');
  }
  addDepartment(data:Department)
  {
    return this.http.post(this.APIURL+'=createdept', data);
  }

  deleteDepartment(id: number){
return this.http.delete(this.APIURL+'=deletedept&DepartmentID='+id);

  }

  updateDepartment(dep :Department)
  {
return this.http.put(this.APIURL+'=updatedept', dep);
  }

  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string){

    this._listners.next(filterBy);
  
  }


  
}