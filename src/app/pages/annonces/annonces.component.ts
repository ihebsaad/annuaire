import { Component, DoCheck, OnInit} from '@angular/core';
import {AnnoncesService} from './annonces.service';
import {ModalComponent2} from './modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Anc} from './model/Anc';
import {NgForm} from '@angular/forms';
import {AppService} from '../../app.service';
import { AuthenticationService } from '../../authentication.service';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss'],
  providers: [AnnoncesService]

})

export class AnnoncesComponent implements OnInit {
  model: any = {};
  model1 = new Anc('','','');
  data: any;
  data1: any;
  id: any;
  test: boolean = false;
  test1: boolean = false;
  page : any;
username:any;

  constructor(private serv : AnnoncesService, private modalService: NgbModal,   private appserv: AppService,
              public auth: AuthenticationService,   private router: Router,public userserv: UsersService ) {
    this.appserv.getusername().subscribe(resp => {
      console.log( resp);
      console.log("name** = "+resp.result);
      this.username=resp.result;
      //return resp.result;
    });
if (!  this.auth.isLoggedIn() )
{this.router.navigateByUrl('/dashboard');
  console.log('Not logged in!');
}
else {

  console.log(' logged in!');

}

   if(this.userserv.isAdmin(this.username)){
  console.log('is Admin yes !');
   }else {
     {this.router.navigateByUrl('/dashboard');
       console.log('Not Admin !');

     }

   }
  }


  ngOnInit() {

    this.getData();

  }

  ngAfterContentInit() {
    this.afficher();
  }

  getData() {

    this.serv.getData().subscribe(resp => {console.log(resp);
      console.log(resp['annonces']);
      this.data = resp['annonces'];

    });

  }

  getDataById(id:any) {
    this.id = id;
    this.serv.getDataById(id).subscribe(resp => {console.log(resp);
      console.log(resp['annonces']);
      this.data1 = resp['annonces'];
      this.model1 = new Anc(this.data1.titre,this.data1.details,this.data1.auteur);

    });

  }


  showStaticModal(obj:any) {
    const activeModal = this.modalService.open(ModalComponent2, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });
    activeModal.componentInstance.id = obj;
    activeModal.componentInstance.modalHeader = 'Confirmation';
    activeModal.componentInstance.modalContent = `Est ce que vous voulez confirmer cette action ?`;

  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false

    this.serv.addData(f.value).subscribe(resp => {console.log(resp);
      this.getData();
      this.test1 = false;
      f.reset();
    });

  }

  getId(obj:any) {

    console.log(obj);
    this.id = obj;
    this.getDataById(obj);

  }

  updateData(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(this.id);
    this.serv.editData(this.id,f.value).subscribe(resp => {console.log(resp);

      this.getData();
      this.test = false;
      f.reset();

    });



  }

  AfficherFormulaire() {

    if (this.test==false) {this.test=true;}else{this.test=false;}

  }

  cacherFormulaire() {

    this.test = false;
  }

  AfficherFormulaire1() {

    if (this.test1==false) {this.test1=true;}else{this.test1=false;}

  }

  cacherFormulaire1() {

    this.test1 = false;
  }

  afficher() {
    this.serv.data.subscribe(data => {
      //do what ever needs doing when data changes
      this.data = data;
    });
  }

}
