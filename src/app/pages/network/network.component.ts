import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NetworkService} from './network.service';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../authentication.service";
import {ModalComponent6} from './modal/modal.component';
//import {ModalComponent} from '../directories/modal/modal.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare function update(div):any;
@Component({
  selector: 'network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']

})
export class NetworkComponent implements OnInit {
id:any;
 
  constructor(private fb: FormBuilder,private serv : NetworkService  , public auth: AuthenticationService,protected router: Router ,  private modalService: NgbModal,) {

      if(!auth.isLoggedIn()){
          this.router.navigateByUrl('/auth/login');
      }

   }

  ngOnInit() {
 
  }
  
 changeType(type)
 {
   let  email=localStorage.getItem('email');
   this.serv.change(email,type).subscribe(resp => {console.log(resp) });

  }


    showStaticModal(obj:any) {
        const activeModal = this.modalService.open(ModalComponent6, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
        });
        activeModal.componentInstance.id = obj;
        activeModal.componentInstance.modalHeader = 'Envoyer un Message';
        activeModal.componentInstance.modalContent = ``;

    }
}