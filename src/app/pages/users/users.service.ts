import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import {BehaviorSubject,  Subject} from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  // configUrl = 'http://localhost:3000';
    private configUrl= environment.API_URL;
    private dataSource = new BehaviorSubject(null);
    data = this.dataSource.asObservable();

    constructor(private http: HttpClient) { }

    updatedData(data: any){
        this.dataSource.next(data);
    }

    getData(): Observable<any> {
console.log(' dynamic Url'+this.configUrl + '/users/list');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.get(this.configUrl + '/users/list', httpOptions);

    }

    getDataById(id: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/list/elt',{id: id}, httpOptions);

    }

    addData(obj: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/add', obj, httpOptions);

    }

    deleteData(id: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.get(this.configUrl + '/users/delete/' + id, httpOptions);

    }


    editData(id: any, obj: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };

        return this.http.post(this.configUrl + '/users/edit/' + id, obj, httpOptions);

    }


    isAdmin(id: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/admin',{id: id}, httpOptions);

    }

    isEmailAdmin(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/admin/'+email, httpOptions);

    }

    Interst1User(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/interest1/'+email, httpOptions);

    }


    Interst2User(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/interest2/'+email, httpOptions);

    }


    Interst3User(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/interest3/'+email, httpOptions);

    }


    Interst4User(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/interest4/'+email, httpOptions);

    }



    Interst5User(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/interest5/'+email, httpOptions);

    }


    Interst6User(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/interest6/'+email, httpOptions);

    }


    Interst7User(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/interest7/'+email, httpOptions);

    }


    Interst8User(email: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/users/interest8/'+email, httpOptions);

    }


// Send Email welcome

 sendEmail(email: any, name:any): Subscription {
         const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
      //  return this.http.post(this.configUrl + '/users/contact/'+email, httpOptions);


     return  this.http
          .post(this.configUrl + '/users/contact/'+email+'/'+name, httpOptions).subscribe(
          (success) => {
             console.log('success');

         },
         (error) => alert(error))
    }
}