import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AppService {

   // configUrl = 'http://localhost:3000';
    private configUrl= environment.API_URL;

    constructor(private http: HttpClient) { }

checkAccess(): Observable<any> {
  let  email=localStorage.getItem('email');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };

        return this.http.get(this.configUrl + '/users/access/'+ email, httpOptions);

    }

}