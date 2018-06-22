import {AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Location } from '../entity/Location';
import {} from '@types/googlemaps';
import {Router} from '@angular/router';
import {ServicesService} from '../../services.service';



@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html', styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Output() positionChanged = new EventEmitter<Location>();

  @ViewChild('search')
  public searchElementRef: ElementRef;
  msg = '';

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private router: Router, private serv: ServicesService) {
  }

  ngOnInit() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
        const defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(36.806495, 10.181532));
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          bounds: defaultBounds, types: ['establishment'],
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.serv.getInfo(place['name'])
                .subscribe(infos => {

                    if (infos['data'].length !== 0) {
                        this.positionChanged.emit(
                            new Location(place.geometry.location.lat(),
                                place.geometry.location.lng()));
                    } else {

                        // Get the snackbar DIV
                        const x = document.getElementById('snackbar');

                        // Add the "show" class to DIV
                        x.className = 'show';

                        // After 3 seconds, remove the show class from DIV
                        setTimeout(function(){ x.className = x.className.replace('show', ''); }, 3000);
                        place.geometry = null;
                        // verify result
                        if (place.geometry === undefined || place.geometry === null) {
                            return;
                        }
                    }

                });
        });
      });
    });
  }
}

