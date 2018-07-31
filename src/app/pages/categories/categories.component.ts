import { Component, OnInit } from '@angular/core';
import {CategoriesService} from './categories.service';
import {LocalDataSource} from 'ng2-smart-table';
import {ModalComponent2} from './modal/modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Cat} from './model/cat';
import {NgForm} from '@angular/forms';
import {AfterContentChecked, AfterContentInit, AfterViewChecked, DoCheck} from '@angular/core';
@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]

})


export class CategoriesComponent implements OnInit {
model: any = {};
    model1 = new Cat('','');
    data: any;
    data1: any;
    id: any;
    test: boolean = false;
    test1: boolean = false;

  constructor(private serv : CategoriesService, private modalService: NgbModal) { }




 
  ngOnInit() {

      this.getData();

  }

    ngAfterContentInit() {
      this.afficher();
    }

  getData() {

      this.serv.getData().subscribe(resp => {console.log(resp);
          console.log(resp['categories']);
          this.data = resp['categories'];

      });

  }

  getDataById(id:any) {
      this.id = id;
      this.serv.getDataById(id).subscribe(resp => {console.log(resp);
          console.log(resp['categories']);
          this.data1 = resp['categories'];
          this.model1 = new Cat(this.data1.titre,this.data1.type);

      });

  }


    showStaticModal(obj:any) {
        const activeModal = this.modalService.open(ModalComponent2, {
            size: 'sm',
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

        this.test = true;

    }

    cacherFormulaire() {

        this.test = false;
    }

    AfficherFormulaire1() {

        this.test1 = true;

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
