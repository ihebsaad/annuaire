import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Entite } from '../entite.model';
import { EntiteService } from '../entite.service';

@Component({
  selector: 'app-entite-details',
  templateUrl: './entite-details.component.html',
  styleUrls: ['./entite-details.component.css']
})
export class EntiteDetailsComponent implements OnInit {
  entite: Entite;
  id: number;

  constructor(private entiteService: EntiteService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.entite = this.entiteService.getEntite(this.id);
        }
      );
  }



 /* onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }*/

}
