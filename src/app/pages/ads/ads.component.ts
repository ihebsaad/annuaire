import { Component, OnInit } from '@angular/core';
import {AnnoncesService} from '../annonces/annonces.service';

@Component({
  selector: 'ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
    providers: [AnnoncesService],

})
export class AdsComponent implements OnInit {

  data: any;

  constructor(private serv : AnnoncesService) { }

  ngOnInit() {
  }
  
  
  ngOnInit() {

    this.getData();

  }

 
  getData() {

    this.serv.getData().subscribe(resp => {console.log(resp);
      console.log(resp['annonces']);
	  this.data = resp['annonces'];

    });

  }

}
