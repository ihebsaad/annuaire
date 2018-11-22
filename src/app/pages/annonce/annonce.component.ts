import { Component, OnInit } from '@angular/core';
 import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {Anc} from "../annonces/model/anc";
import {AnnoncesService} from "../annonces/annonces.service";

@Component({
  selector: 'annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss'],
    providers: [AnnoncesService],

})
export class AnnonceComponent implements OnInit {

  data: any;

  id:any;
  model1 = new Anc('','','');

  constructor(private serv : AnnoncesService,private route: ActivatedRoute,
              private router: Router,) {
  ///this.data=  serv.getDataById(id);
  }


  ngOnInit() {

  //  this.getData();
    let id = this.route.snapshot.paramMap.get('id');
this.getDataById(id);

  }

  getDataById(id:any) {
    this.id = id;
    this.serv.getDataById(id).subscribe(resp => {console.log(resp);
      console.log(resp['annonces']);
      this.data = resp['annonces'];
      this.model1 = new Anc(this.data.titre,this.data.details,this.data.auteur);

    });

  }



  getData() {

    this.serv.getData().subscribe(resp => {console.log(resp);
      console.log(resp['annonces']);
	  
      this.data = resp['annonces'];

    });

  }

}
