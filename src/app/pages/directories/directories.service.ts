import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DirectoriesService {

   // configUrl = 'http://localhost:3000';
    private configUrl= environment.API_URL;
    private dataSource = new BehaviorSubject(null);
    data = this.dataSource.asObservable();

    constructor(private http: HttpClient) { }

    updatedData(data: any){
        this.dataSource.next(data);
    }

    getData(): Observable<any> {
console.log(' dynamic Url'+this.configUrl + '/repertoires/list');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.get(this.configUrl + '/repertoires/list', httpOptions);

    }

    getDataByUser(auteur): Observable<any> {
        console.log(' dynamic Url'+this.configUrl + '/articles/list');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.get(this.configUrl + '/repertoires/listu/'+auteur, httpOptions);

    }

    getDataPerCateg(titresel:String): Observable<any> {
console.log(' dynamic Url'+this.configUrl + '/repertoires/list');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.get(this.configUrl + '/repertoires/searchpercateg/'+titresel, httpOptions);

    }
    
   approve(id: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };

        return this.http.post(this.configUrl + '/repertoires/approve/' + id, httpOptions);

    }
    getDataById(id: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/repertoires/list/elt',{id: id}, httpOptions);

    }
getTotalD():Observable<any> { const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/repertoires/count', httpOptions);

    }

getTotalA():Observable<any> { const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/repertoires/counta', httpOptions);

    }

getTotalN():Observable<any> { const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/repertoires/countn', httpOptions);

    }

getTotalperCat(cat:any):Observable<any> {

 const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.get(this.configUrl + '/repertoires/countpercat/'+cat, httpOptions);

    }
    getNote():Observable<any> { const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/repertoires/note', httpOptions);

    }
    addData(obj: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.post(this.configUrl + '/repertoires/add', obj, httpOptions);

    }

    deleteData(id: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.http.get(this.configUrl + '/repertoires/delete/' + id, httpOptions);

    }


    editData(id: any, obj: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };

        return this.http.post(this.configUrl + '/repertoires/edit/' + id, obj, httpOptions);

    }








}


