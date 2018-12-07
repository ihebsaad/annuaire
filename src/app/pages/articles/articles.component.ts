import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, NgModule,
  OnInit
} from '@angular/core';
import {ArticlesService} from './articles.service';
import {LocalDataSource} from 'ng2-smart-table';
import {ModalComponent4} from './modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Art} from './model/art';
import {NgForm} from '@angular/forms';

import {AppService} from '../../app.service';
import { AuthenticationService } from '../../authentication.service';
import {Router} from "@angular/router";
import {AngularEditorConfig, AngularEditorModule} from "@kolkov/angular-editor";
import {HttpClientModule} from "@angular/common/http";


 @Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticlesService],

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
   typeuser:any
   editor1 : any;
  // editor1='';

//user =    localStorage.getItem('username');
 user =    localStorage.getItem('email');
//  user= HeaderComponent.username;
    username:any;
  constructor(private serv : ArticlesService, private modalService: NgbModal,   private appserv: AppService,
    public auth: AuthenticationService    ,protected router: Router) {
    this.appserv.getusername().subscribe(resp => {
    console.log( resp);
    console.log("name** = "+resp.result);
    this.username=resp.result;
    //return resp.result;

      if ( this.typeuser=='admin')
      {
        this.getData();

      }else{
         this.getDataByUser(this.username);

      }

  /*    if (status != "admin"){
        this.router.navigateByUrl('/');

      }*/

});
}
getUsername(  )
{
  this.appserv.getusername().subscribe(resp => {
     this.username=resp.result;
   });

}

  ngOnInit() {

   // this.getData();

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
  getDataByUser(auteur) {

    this.serv.getDataByUser(auteur).subscribe(resp => {console.log(resp);
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
    this.getUsername();

  }


  showStaticModal(obj:any) {
    const activeModal = this.modalService.open(ModalComponent4, {
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
       this.test1 = false;
      f.reset();
      this.appserv.getusername().subscribe(resp => {
        console.log( resp);
        console.log("name** = "+resp.result);
        this.username=resp.result;
        //return resp.result;

        if ( this.typeuser=='admin')
        {
          this.getData();

        }else{
          this.getDataByUser(this.username);

        }

      });
    });
  this.getUsername();
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

    this.getUsername();

  }

  AfficherFormulaire() {
    if (this.test1==true) {this.test1=false;}
    if (this.test==false) {this.test=true;}else{this.test=false;}
  }


  AfficherFormulaire1() {
    if (this.test==true) {this.test=false;}
    if (this.test1==false) {this.test1=true;}else{this.test1=false;}
  }

  cacherFormulaire() {
    this.test = false;
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


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }


}
