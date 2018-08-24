import { Component, DoCheck, OnInit} from '@angular/core';
import {ListingService} from './listing.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {AppService} from '../../app.service';
import { AuthenticationService } from '../../authentication.service';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import {CategoriesService} from '../categories/categories.service';
import {DirectoriesService} from '../directories/directories.service';
@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  providers: [ListingService,CategoriesService,DirectoriesService],

})

export class ListingComponent implements OnInit {
 data:any;
 selectedCategory:String;
 arraycat: any[] = [];     
      arraycat1: any[] = []; 
        arraycat2: any[] = []; 
        dataCatnames:any;dataC:any;
  constructor(private serv : ListingService,  private router: Router,private servDirect: DirectoriesService,private servCateg:CategoriesService ) {
//Get categories list 
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

  
  }

  ngAfterContentInit() {
    
  }

 
  getDatapercategory(category:any) {

      this.servDirect.getDataPerCateg(category).subscribe(resp => {console.log(resp);
          console.log(resp['repertoires']);
          this.data = resp['repertoires'];

      });

  }

}
