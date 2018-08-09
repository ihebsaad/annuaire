import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from './search-map/entity/Location';
import {Router} from '@angular/router';
import {MapComponent} from './search-map/map/map.component';
import {DataService} from './data.service';
import {CategoriesService} from '../categories/categories.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.scss'],
  providers: [CategoriesService]
})
export class DashboardComponent implements OnInit {
    searchedLocation: Location = new Location();
    source = 'assets/tunisie.jpg';
    radioModel = 'left';
    dataC:any;
    constructor(private data: DataService, private router: Router, private servCateg:CategoriesService) {
     this.servCateg.getData().subscribe(resp => {console.log(resp);
          console.log(resp['categories']);
          this.dataC = resp['categories'];
console.log(this.dataC);
      });

    }

    ngOnInit() {
        this.data.location.subscribe(loc => this.searchedLocation = loc);
    }

    updateLocation(event: Location) {
        this.searchedLocation = new Location(event.latitude, event.longitude);
        this.data.changeLocation(this.searchedLocation);
        this.router.navigate(['pages/map']);
    }

      getData() {

      this.servCateg.getData().subscribe(resp => {console.log(resp);
          console.log(resp['categories']);
          this.dataC = resp['categories'];
console.log(this.dataC);
      });

  }

}
