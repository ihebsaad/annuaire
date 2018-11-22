import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../articles/articles.service';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
    providers: [ArticlesService],

})
export class BlogComponent implements OnInit {

  data: any;

  constructor(private serv : ArticlesService) { }


  ngOnInit() {

    this.getData();

  }

 
  getData() {

    this.serv.getData().subscribe(resp => {console.log(resp);
      console.log(resp['articles']);
	  
      this.data = resp['articles'];
     // alert(this.data[1]['_id']);

    });

  }

}
