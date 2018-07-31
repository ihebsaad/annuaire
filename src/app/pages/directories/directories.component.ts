import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';
import {DirectoriesService} from './directories.service';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {Rep} from './model/rep';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-directories',
  templateUrl: './directories.component.html',
  styleUrls: ['./directories.component.scss'],
})
export class DirectoriesComponent implements OnInit, AfterContentInit {
    model: any = {};
    model1 = new Rep('','','','','','');
    data: any;
    data1: any;
    id: any;
    test: boolean = false;
    test1: boolean = false;
    page : any;


  constructor(private serv: DirectoriesService, private modalService: NgbModal) { }

  ngOnInit() {

      this.getData();

  }

    ngAfterContentInit() {
      this.afficher();
    }

  getData() {

      this.serv.getData().subscribe(resp => {console.log(resp);
          console.log(resp['repertoires']);
          this.data = resp['repertoires'];

      });

  }

  getDataById(id:any) {
      this.id = id;
      this.serv.getDataById(id).subscribe(resp => {console.log(resp);
          console.log(resp['repertoires']);
          this.data1 = resp['repertoires'];
          this.model1 = new Rep(this.data1.titre,this.data1.categorie,this.data1.adresse,this.data1.ville,this.data1.tel,this.data1.auteur);

      });

  }


    showStaticModal(obj:any) {
        const activeModal = this.modalService.open(ModalComponent, {
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
