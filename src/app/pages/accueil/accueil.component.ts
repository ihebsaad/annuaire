import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from './search-map/entity/Location';
import {Router} from '@angular/router';
import {MapComponent} from './search-map/map/map.component';
import {DataService} from './data.service';
import {CategoriesService} from '../categories/categories.service';
import {DirectoriesService} from '../directories/directories.service';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {UsersService} from "../users/users.service";

@Component({
  selector: 'ngx-accueil',
  templateUrl: './accueil.component.html', styleUrls: ['./accueil.component.scss'],
  providers: [CategoriesService,DirectoriesService]
})
export class AccueilComponent implements OnInit {
    selectedCategory: Category;
    arraycat: any[] = [];     
      arraycat1: any[] = []; 
        arraycat2: any[] = []; 
    searchedLocation: Location = new Location();
    source = 'assets/tunisie.jpg';
    source2 = 'assets/IBO.mp4';
    radioModel = 'left';
    dataC:any;dataD:any;cat:any;dataCatnames:any;

    cat1: any;cat2: any;cat3: any;cat4: any;cat5: any;cat6: any;cat7: any;cat8 : any;


    countD:any;countA:any;countN:any;countCat:any;
    constructor(private data: DataService,private userServ :UsersService,
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
 /*for (var i = 0; i <= this.dataC.length - 1; i++) {
   
   let value=[resp2['categories'][i]][0].titre;
    
     var promise= this.servDirect.getTotalperCat(value).subscribe(resp3 => {
console.log('i='+i);
     console.log('catégorie ='+value);   
console.log('count = '+resp3['count']);
console.log([resp['categories'][i]][0].titre);
// this.arraycat1[i]=[resp['categories'][i]][0].titre;
//this.arraycat2[i]=resp['count'];
// [[resp['categories'][i]][0].titre]=  resp['count'];
      });
      promises.push(promise);
 }*/
 
// console.log( this.arraycat1);
  //console.log( this.arraycat2);
//let value=[resp['categories'][i]][0].titre;
   
  let observables = new Array();

//let value=resp['categories'][i].titre;
for(var i = 0; i <= this.dataC.length - 1; i++ ) {
   let value=resp['categories'][i].titre;
   this.arraycat1[i]=value;
    observables.push(this.servDirect.getTotalperCat(value));
}

Observable.forkJoin(observables).subscribe(
    res => {console.log(res);
      for(var i = 0; i <= this.dataC.length - 1; i++ ) {
   ////////  this.arraycat2[i]=res[i].count;
    }
    
  },
    error => console.log('Error: ', error)
);
      });

 
           });
 
    }

ngOnInit() {
        this.data.location.subscribe(loc => this.searchedLocation = loc);
        this.getCat1();
}

getCat1()
{
let  email=localStorage.getItem('email');
this.userServ.Interst1User(email).subscribe(result => {
this.cat1=result['result'];
 });

 }

 getCat2()
    {
        let  email=localStorage.getItem('email');
        this.userServ.Interst2User(email).subscribe(result => {
            this.cat2=result['result'];
        });

    }

    getCat3()
    {
        let  email=localStorage.getItem('email');
        this.userServ.Interst3User(email).subscribe(result => {
            this.cat3=result['result'];
        });

    }

    getCat4()
    {
        let  email=localStorage.getItem('email');
        this.userServ.Interst4User(email).subscribe(result => {
            this.cat4=result['result'];
        });

    }

    getCat5()
    {
        let  email=localStorage.getItem('email');
        this.userServ.Interst5User(email).subscribe(result => {
            this.cat5=result['result'];
        });

    }

    getCat6()
    {
        let  email=localStorage.getItem('email');
        this.userServ.Interst6User(email).subscribe(result => {
            this.cat6=result['result'];
        });

    }

    getCat7()
    {
        let  email=localStorage.getItem('email');
        this.userServ.Interst7User(email).subscribe(result => {
            this.cat7=result['result'];
        });

    }

    getCat8()
    {
        let  email=localStorage.getItem('email');
        this.userServ.Interst8User(email).subscribe(result => {
            this.cat8=result['result'];
        });

    }

/*findcat(cat:any):any{
  console.log('findcat '+cat);
  this.servDirect.getTotalperCat(cat).subscribe(resp => {
console.log('after service');
    console.log(resp['count']);

         this.countCat = resp['count'];
//console.log(this.countD);
return  resp['count'];
      });
}*/

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

this.servDirect.getDataPerCateg(value).subscribe(resp => {
  console.log("directories");
         // console.log(resp['repertoires']);
          this.dataD = resp['repertoires'];
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