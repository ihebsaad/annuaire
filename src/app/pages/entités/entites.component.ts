import { Component, OnInit } from '@angular/core';
import { EntiteService } from './entite.service';
import { Entite } from './entite.model';

@Component({
  selector: 'app-entites',
  templateUrl: './entites.component.html',
  styleUrls: [ './entites.component.scss'],
providers: [EntiteService]
})
export class EntitesComponent implements OnInit {
  selectedEntite: Entite;

 constructor(private entiteService: EntiteService) { }

  ngOnInit() {
    this.entiteService.entiteSelected
      .subscribe(
        (entite: Entite) => {
          this.selectedEntite = entite;
        }
      );
  }

}