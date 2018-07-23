import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EntiteService } from '../entite.service';

import { Entite } from '../entite.model';

@Component({
  selector: 'app-entite-liste',
  templateUrl: './entite-liste.component.html',
  styleUrls: ['./entite-liste.component.scss']
})
export class EntiteListeComponent implements OnInit {
  entites: Entite[];

  constructor(private entiteService: EntiteService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.entites = this.entiteService.getEntites();
  }

  onNewEntite() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}