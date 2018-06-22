import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {Location} from './search-map/entity/Location';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private locat = new BehaviorSubject(null);
  location = this.locat.asObservable();
  constructor() { }

  changeLocation(loc: Location) {
      this.locat.next(loc);
  }
}
