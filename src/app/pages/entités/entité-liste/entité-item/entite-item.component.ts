import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Entite } from '../../entite.model';

@Component({
  selector: 'app-entite-item',
  templateUrl: './entite-item.component.html',
  styleUrls: ['./entite-item.component.scss']
})
export class EntiteItemComponent implements OnInit {
  @Input() entite: Entite;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

  
}
