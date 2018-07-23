import { EventEmitter, Injectable } from '@angular/core';

import { Entite } from './entite.model';

@Injectable()
export class EntiteService {
  entiteSelected = new EventEmitter<Entite>();

  private entites: Entite[] = [
    new Entite(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG'
     ),
    new Entite('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg'
     )
  ];

  constructor() {}

  getEntites() {
    return this.entites.slice();
  }

  getEntite(index: number) {
    return this.entites[index];
  }

  
}
