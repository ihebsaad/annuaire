import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from './search-map/entity/Location';
import {Router} from '@angular/router';
import {MapComponent} from './search-map/map/map.component';
import {DataService} from './data.service';
import {CategoriesService} from '../categories/categories.service';
import {DirectoriesService} from '../directories/directories.service';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'ngx-accueil',
  templateUrl: './accueil.component.html', styleUrls: ['./accueil.component.scss'],
  providers: [CategoriesService,DirectoriesService]
})
export class AccueilComponent implements OnInit {
    selectedCategory: Category;
    arraycat: any[] = [];     datadirec:any;
      arraycat1: any[] = []; 
        arraycat2: any[] = []; 
    searchedLocation: Location = new Location();
    source = 'assets/tunisie.jpg';
    radioModel = 'left';
    dataC:any;dataD:any;cat:any;dataCatnames:any;
    countD:any;countA:any;countN:any;countCat:any;
    constructor(private data: DataService,
     private router: Router,
     private servDirect: DirectoriesService,
      private servCateg:CategoriesService) {
     this.servCateg.getData().subscribe(resp => {//console.log(resp);
        //  console.log(resp['categories']);
          this.dataC = resp['categories'];

this.servCateg.getNames().subscribe(resp => {//console.log(resp);
          console.log(resp['categories']);
          this.dataCatnames = resp['categories'];
var promises = [];
 
  let observables = new Array();

//let value=resp['categories'][i].titre;
for(var i = 0; i <= this.dataC.length - 1; i++ ) {
   let value=resp['categories'][i].titre;
   this.arraycat1[i]=value;

    observables.push(this.servDirect.getTotalperCat(value));
}
this.selectedCategory=   this.arraycat1[0];
this.getDatapercategory(this.selectedCategory);

Observable.forkJoin(observables).subscribe(
    res => {console.log(res);
      for(var i = 0; i <= this.dataC.length - 1; i++ ) {
     this.arraycat2[i]=res[i].count;
    }
    
  },
    error => console.log('Error: ', error)
);
      });

 
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
fnlist(){

 var x = document.getElementsByClassName("item");
for(var i=0;i< x.length;i++){
    x[i].classList.add("list-group-item");
       x[i].classList.add("row");
    }
}
fngrid(){

 var x = document.getElementsByClassName("item");
for(var i=0;i< x.length;i++){
   x[i].classList.remove("list-group-item");
   x[i].classList.add("grid-group-item");
     x[i].classList.remove("row");
    }
}
  getDatapercategory(category:any) {

      this.servDirect.getDataPerCateg(category).subscribe(resp => {console.log(resp);
          console.log(resp['repertoires']);
          this.datadirec = resp['repertoires'];

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