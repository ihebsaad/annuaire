import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from './search-map/entity/Location';
import {Router} from '@angular/router';
import {MapComponent} from './search-map/map/map.component';
import {DataService} from './data.service';



@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    searchedLocation: Location = new Location();
    source = 'assets/tunisie.jpg';
    constructor(private data: DataService, private router: Router) {
    }

    ngOnInit() {
        this.data.location.subscribe(loc => this.searchedLocation = loc);
    }

    updateLocation(event: Location) {
        this.searchedLocation = new Location(event.latitude, event.longitude);
        this.data.changeLocation(this.searchedLocation);
        this.router.navigate(['pages/map']);
    }
}
