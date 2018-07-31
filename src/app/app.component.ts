/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {AppService} from './app.service';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
//export const LOGGEDIN=false;
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,private serv: AppService) {


       }


  ngOnInit() {
  let	statusb:any;
    this.analytics.trackPageViews();
    this.serv.checkAccess().subscribe(resp => {//console.log( resp);
    	//console.log("status = "+resp.result);
    	status=resp.result;
    	if (status=="simple"){statusb=false;}
    	else {statusb=true;}
          
      });


    	}


  
}
