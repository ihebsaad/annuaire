import { Component, OnInit } from '@angular/core';
import {UsersService} from './users.service';
import {LocalDataSource} from 'ng2-smart-table';
import {ModalComponent5} from './modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from './model/user';
import {NgForm} from '@angular/forms';
//import {AfterContentChecked, AfterContentInit, AfterViewChecked, DoCheck} from '@angular/core';
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
///    entryComponents: [ModalComponent],


})


export class UsersComponent implements OnInit {
model: any = {};
    model1 = new User('','','' ,'','',false,false,false,false,false,false,false,false);
    data: any;
    data1: any;
    id: any;
    test: boolean = false;
    test1: boolean = false;
    page : any;

  constructor(private serv : UsersService, private modalService: NgbModal) { }


    toggleVisibility1(e){
         this.model1.cat1= e.target.checked;
    }
    toggleVisibility2(e){
        this.model1.cat2= e.target.checked;

    }
    toggleVisibility3(e){
        this.model1.cat3= e.target.checked;
    }
    toggleVisibility4(e){
        this.model1.cat4= e.target.checked;

    }
    toggleVisibility5(e){
        this.model1.cat5= e.target.checked;
    }
    toggleVisibility6(e){
        this.model1.cat6= e.target.checked;
     }
    toggleVisibility7(e){
        this.model1.cat7= e.target.checked;
     }
    toggleVisibility8(e){
        this.model1.cat8= e.target.checked;
     }



  ngOnInit() {

      this.getData();

  }

    ngAfterContentInit() {
      this.afficher();
    }

  getData() {

      this.serv.getData().subscribe(resp => {console.log(resp);
          console.log(resp['users']);
          this.data = resp['users'];

      });

  }

  getDataById(id:any) {
      this.id = id;
      this.serv.getDataById(id).subscribe(resp => {console.log(resp);
          console.log(resp['users']);
          this.data1 = resp['users'];
          this.model1 = new User(this.data1.fullName,this.data1.email,this.data1.status,this.data1.password,this.data1.company,this.data1.cat1,this.data1.cat2,this.data1.cat3,this.data1.cat4,this.data1.cat5,this.data1.cat6,this.data1.cat7,this.data1.cat8);

      });

  }

    showStaticModal(obj:any) {
         const activeModal = this.modalService.open(ModalComponent5, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
        });
        activeModal.componentInstance.id = obj;
        activeModal.componentInstance.modalHeader = 'Confirmation';
        activeModal.componentInstance.modalContent = `Est ce que vous voulez confirmer cette action ?`;
    }

    onSubmit(f: NgForm) {
        console.log('valeur du formulaire :'+f.value);  // { first: '', last: '' }
        console.log('validité du formulaire :'+f.valid);  // false
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
