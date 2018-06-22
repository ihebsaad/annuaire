import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {

  constructor(private http: HttpClient) { }


    getInfo(name: string): Observable<any[]> {
        return this.http.post<any[]>('http://localhost:8000/api/search', {name: name});
    }
}
