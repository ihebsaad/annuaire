/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {AppService} from './app.service';
//import the file uploader plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//define the constant url we would be uploading to.
const URL = 'http://localhost:3000/api/upload';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
//export const LOGGEDIN=false;
export class AppComponent implements OnInit {
public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
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
 //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
       this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
       //overide the onCompleteItem property of the uploader so we are 
       //able to deal with the server response.
       this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
        };


    	}


  
}
