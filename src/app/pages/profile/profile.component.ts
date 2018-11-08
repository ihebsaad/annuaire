import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProfileService} from './profile.service';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../authentication.service";

declare function update(div):any;
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent implements OnInit {
id:any;
 
  constructor(private fb: FormBuilder,private serv : ProfileService  , public auth: AuthenticationService,protected router: Router) {
/*
      if(!auth.isLoggedIn()){
          this.router.navigateByUrl('/auth/login');

      }

 */

  }

  ngOnInit() {
 
  }
  
 changeType(type)
 {
   let  email=localStorage.getItem('email');

   this.serv.change(email,type).subscribe(resp => {console.log(resp) });


  }

    next()
    {
        this.router.navigateByUrl('/');

    }

    previous()
    {
        this.router.navigateByUrl('/interest');

    }

}