import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../entity/Location';
import {DataService} from '../../data.service';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  searchedLocation: Location = new Location();
  constructor(private data: DataService) {
  }

    ngOnInit(): void {
        this.data.location.subscribe(loc => {this.searchedLocation = loc
            this.latitude = this.searchedLocation.latitude;
            this.longitude = this.searchedLocation.longitude;
            this.zoom = 18;
        });
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.searchedLocation = new Location(
          position.coords.latitude, position.coords.longitude,
        );
      });
    }
  }
}
