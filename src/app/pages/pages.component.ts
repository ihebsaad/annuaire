import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS_SIMPLE } from './pages-menu';


@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
      `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
constructor() {

if (status != "admin"){

this.menu = MENU_ITEMS_SIMPLE;
}
       }
  
}
