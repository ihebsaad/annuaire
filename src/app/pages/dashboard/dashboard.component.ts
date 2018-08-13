import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from './search-map/entity/Location';
import {Router} from '@angular/router';
import {MapComponent} from './search-map/map/map.component';
import {DataService} from './data.service';
import {CategoriesService} from '../categories/categories.service';
import {DirectoriesService} from '../directories/directories.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.scss'],
  providers: [CategoriesService,DirectoriesService]
})
export class DashboardComponent implements OnInit {
    selectedCategory: Category;
    searchedLocation: Location = new Location();
    source = 'assets/tunisie.jpg';
    radioModel = 'left';
    dataC:any;dataD:any;
    countD:any;countA:any;countN:any;
    constructor(private data: DataService, private router: Router,private servDirect: DirectoriesService, private servCateg:CategoriesService) {
     this.servCateg.getData().subscribe(resp => {console.log(resp);
          console.log(resp['categories']);
          this.dataC = resp['categories'];
console.log(this.dataC);
      });
         //calcul tot repertoires
this.servDirect.getTotalD().subscribe(resp => {console.log(resp);
          
         this.countD = resp['count'];
//console.log(this.countD);
      });  
         //calcul tot repertoires
this.servDirect.getTotalA().subscribe(resp => {console.log(resp);
          
         this.countA = resp['count'];
//console.log(this.countD);
      }); 
               //calcul tot repertoires
this.servDirect.getTotalN().subscribe(resp => {console.log(resp);
          
         this.countN = resp['count'];
//console.log(this.countD);
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
fnclick(value : string){
    
    console.log(value);

this.servDirect.getDataPerCateg(value).subscribe(resp => {console.log(resp);
          console.log(resp['categories']);
          this.dataD = resp['categories'];
console.log(this.dataD);
      });    
}
}
export class Category {
  public titre: string;
  public type: string;

  constructor(name: string, type: string) {
    this.titre = name;
    this.type = type;
  }
}