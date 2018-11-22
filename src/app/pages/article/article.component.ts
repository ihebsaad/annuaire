import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../articles/articles.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {Art} from "../articles/model/art";

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
    providers: [ArticlesService],

})
export class ArticleComponent implements OnInit {

  data: any;

  id:any;
  model1 = new Art('','','');

  constructor(private serv : ArticlesService,private route: ActivatedRoute,
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
      console.log(resp['articles']);
      this.data = resp['articles'];
      this.model1 = new Art(this.data.title,this.data.contenu,this.data.auteur);

    });

  }



  getData() {

    this.serv.getData().subscribe(resp => {console.log(resp);
      console.log(resp['articles']);
	  
      this.data = resp['articles'];

    });

  }

}
