import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  private configUrl= environment.API_URL;

 // configUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }


  getData(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get(this.configUrl + '/annonces/list', httpOptions);

  }


  addData(obj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post(this.configUrl + '/annonces/add', obj, httpOptions);

  }
}
