import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import {BehaviorSubject,  Subject} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  // configUrl = 'http://localhost:3000';
  private configUrl= environment.API_URL;
  private dataSource = new BehaviorSubject(null);
  data = this.dataSource.asObservable();
  constructor(private http: HttpClient) { }

  updatedData(data: any){
    this.dataSource.next(data);
  }

  getData(): Observable<any> {
    console.log(' dynamic Url'+this.configUrl + '/annonces/list');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get(this.configUrl + '/annonces/list', httpOptions);

  }

  getDataById(id: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.post(this.configUrl + '/annonces/list/elt',{id: id}, httpOptions);

  }

  addData(obj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.post(this.configUrl + '/annonces/add', obj, httpOptions);

  }

  deleteData(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get(this.configUrl + '/annonces/delete/' + id, httpOptions);

  }


  editData(id: any, obj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.http.post(this.configUrl + '/annonces/edit/' + id, obj, httpOptions);

  }








}