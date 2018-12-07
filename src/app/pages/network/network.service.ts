import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private configUrl= environment.API_URL;
  constructor(private http: HttpClient){

  }


  change(email:any,type: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.http.post(this.configUrl + '/users/change/' + email+'/'+type, httpOptions);

  }
 
}