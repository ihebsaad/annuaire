import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ContactService} from './contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

 
  
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  email:string = '' ;
  name:string = '';
  titleAlert:string = 'This field is required';
  constructor(private fb: FormBuilder,private serv : ContactService) { 

    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'email':[null,Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'validate' : ''
    });

  }

  ngOnInit() {

  	 this.rForm.get('validate').valueChanges.subscribe(

      (validate) => {

          if (validate == '1') {
              this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
              this.titleAlert = 'You need to specify at least 3 characters';
          } else {
              this.rForm.get('name').setValidators(Validators.required);
          }
          this.rForm.get('name').updateValueAndValidity();

      });
  }
  

SendMail(obj: any) {

    this.serv.mailsend(obj).subscribe(resp => {
console.log('from ts');
    	console.log(resp);
    });

  }


    
  }
