import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import {BehaviorSubject,  Subject} from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  // configUrl = 'http://localhost:3000';
  private configUrl= environment.API_URL;
  private dataSource = new BehaviorSubject(null);
  data = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  updatedData(data: any){
    this.dataSource.next(data);
  }

  getData(): Observable<any> {
    console.log(' dynamic Url'+this.configUrl + '/articles/list');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get(this.configUrl + '/articles/list', httpOptions);

  }

  getDataByUser(auteur): Observable<any> {
    console.log(' dynamic Url'+this.configUrl + '/articles/list');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get(this.configUrl + '/articles/listu/'+auteur, httpOptions);

  }

  getDataById(id: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.post(this.configUrl + '/articles/list/elt',{id: id}, httpOptions);

  }

  addData(obj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.post(this.configUrl + '/articles/add', obj, httpOptions);

  }

  deleteData(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get(this.configUrl + '/articles/delete/' + id, httpOptions);

  }


  editData(id: any, obj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.http.post(this.configUrl + '/articles/edit/' + id, obj, httpOptions);

  }


  getNameByEmail(email: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.post(this.configUrl + '/users/list/user',{email: email}, httpOptions);

  }
/*

  getName() {
    // return JSON.parse(localStorage.getItem('currentUser')).name;
    let  name=localStorage.getItem('name');
  //  return  JSON.parse(name);
    console.log('Nom :'+name);

  }
*/

}