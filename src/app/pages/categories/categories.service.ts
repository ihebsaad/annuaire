import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private configUrl= environment.API_URL;
  constructor(private http: HttpClient) { }


  getData(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get(this.configUrl+'/categories/list',httpOptions);

  }


  addData(obj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post(this.configUrl+'/categories/add',obj,httpOptions);

  }

    deleteData(id: any): Observable<any> {
      console.log("Entred to delete service");
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.get(this.configUrl + '/categories/delete/' + id, httpOptions);

    }

      editData(id: any, obj: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };

        return this.http.post(this.configUrl + '/categories/edit/' + id, obj, httpOptions);

    }

}

