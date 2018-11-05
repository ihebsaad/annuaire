import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProfileService} from './profile.service';
import {Router} from "@angular/router";

declare function update(div):any;
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent implements OnInit {
id:any;
 
  constructor(private fb: FormBuilder,private serv : ProfileService, protected router:Router) {

 

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

}