import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {InterestService} from './interest.service';
import {Router} from "@angular/router";
import {NbMenuItem} from "@nebular/theme";
import {AuthenticationService} from "../authentication.service";

declare function update(div):any;
@Component({
  selector: 'interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
/*
    styles: [`
        :host nb-tab {
            padding: 1.25rem;
        }
    `],*/

})
export class InterestComponent implements OnInit {
 id:any;
    user: any = {};
    company:any;


    constructor(private fb: FormBuilder,private serv : InterestService   , public auth: AuthenticationService,protected router: Router) {

    /*    if(!auth.isLoggedIn()){
            this.router.navigateByUrl('/auth/login');

        }
    */
  }

  ngOnInit() {
 
  }
  
 changeEnterprise(event: any)
 {
     let entreprise=event.target.value;
    let  email=localStorage.getItem('email');

   this.serv.change(email,entreprise).subscribe(resp => {console.log(resp) });

  }
    changeCat(nbr , value)
    {
        let  email=localStorage.getItem('email');

        this.serv.changeCat(email,nbr,value).subscribe(resp => {console.log(resp) });

    }

    toggleVisibility1(e){
        this.user.cat1=e.target.checked;;
        this.changeCat('1', this.user.cat1);
    }

    toggleVisibility2(e){
        this.user.cat2=e.target.checked;;
        this.changeCat('2', this.user.cat2);
    }

    toggleVisibility3(e){
        this.user.cat3=e.target.checked;;
        this.changeCat('3', this.user.cat3);
    }

    toggleVisibility4(e){
        this.user.cat4=e.target.checked;;
        this.changeCat('4', this.user.cat4);
    }

    toggleVisibility5(e){
        this.user.cat5=e.target.checked;;
        this.changeCat('5', this.user.cat5);
    }

    toggleVisibility6(e){
        this.user.cat6=e.target.checked;;
        this.changeCat('6', this.user.cat6);
    }

    toggleVisibility7(e){
        this.user.cat7=e.target.checked;;
        this.changeCat('7', this.user.cat7);
    }

    toggleVisibility8(e){
        this.user.cat8=e.target.checked;;
        this.changeCat('8', this.user.cat8);
    }

    savedetails()
    {


    }

    next()
    {
        this.router.navigateByUrl('/profile');

    }

}