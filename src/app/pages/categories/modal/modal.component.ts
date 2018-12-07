import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {CategoriesService} from "../categories.service";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
    </div>
    <div class="modal-footer">
        <button class="btn btn-md btn-hero-success" (click)="deleteData(); closeModal()">Confirmer</button>
        <button class="btn btn-md btn-hero-danger" (click)="closeModal()">Annuler</button>
    </div>
  `,
})
export class ModalComponent2 {

  modalHeader: string;
  modalContent = ``;
  id: any;
  data: any;
    
  constructor(private activeModal: NgbActiveModal, private serv: CategoriesService) { }

  closeModal() {
    this.activeModal.close();

  }

    getData() {

        this.serv.getData().subscribe(resp => {console.log(resp);
            console.log(resp['categories']);
            this.data = resp['categories'];
            this.serv.updatedData(this.data);
        });

    }

    refresh(f: NgForm){
        f.reset();
    }

    deleteData() {

        this.serv.deleteData(this.id).subscribe(resp => {console.log(resp);

            //    this.getData();
            this.data = resp['categories'];
             //this.refresh(this.data);
              //  this.serv.updatedData(this.data);
            this.refresh(  this.data );
        });
    }

}
