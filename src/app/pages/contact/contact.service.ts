import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private configUrl= environment.API_URL;
  constructor(private http: HttpClient) { }
  mailsend(obj: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
console.log('from service');
    return this.http.post(this.configUrl+'/contact/send',obj,httpOptions);

  }
}