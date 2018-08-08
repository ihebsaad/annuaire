import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';
import {ArticlesService} from './articles.service';
import {LocalDataSource} from 'ng2-smart-table';
import {ModalComponent3} from './modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Art} from './model/art';
import {NgForm} from '@angular/forms';
//import {HeaderComponent} from '@theme/components/header/header.component.ts'
import {header} from "express-validator/check";
//import {UserDetails} from  '../../authentification.service';
import {AppService} from '../../app.service';
import { AuthenticationService } from '../../authentication.service';
 @Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticlesService]

})

export class ArticlesComponent implements OnInit {
  model: any = {};
  model1 = new Art('','','');
  data: any;
  data1: any;
  id: any;
  test: boolean = false;
  test1: boolean = false;
  page : any;
//user =    localStorage.getItem('username');
 user =    localStorage.getItem('email');
//  user= HeaderComponent.username;
    username:any;
  constructor(private serv : ArticlesService, private modalService: NgbModal,   private appserv: AppService,
    public auth: AuthenticationService) {
    this.appserv.getusername().subscribe(resp => {
    console.log( resp);
    console.log("name** = "+resp.result);
    this.username=resp.result;
    //return resp.result;
});
}

  ngOnInit() {

    this.getData();

  }

  ngAfterContentInit() {
    this.afficher();
  }

  getData() {

    this.serv.getData().subscribe(resp => {console.log(resp);
      console.log(resp['articles']);
      this.data = resp['articles'];

    });

  }

  getDataById(id:any) {
    this.id = id;
    this.serv.getDataById(id).subscribe(resp => {console.log(resp);
      console.log(resp['articles']);
      this.data1 = resp['articles'];
      this.model1 = new Art(this.data1.title,this.data1.contenu,this.data1.auteur);

    });

  }


  showStaticModal(obj:any) {
    const activeModal = this.modalService.open(ModalComponent3, {
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

   getName() {
     // return JSON.parse(localStorage.getItem('currentUser')).name;
     let  email=localStorage.getItem('email');
     //return  JSON.parse(name);
     console.log('email :'+email);

    let name= this.serv.getNameByEmail(email);
     console.log('name :'+email);

   }

}
