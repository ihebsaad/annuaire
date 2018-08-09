import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {CategoriesService} from "../categories.service";

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
      <button class="btn btn-md btn-primary" (click)="deleteData(); closeModal()">Confirmer</button>
        <button class="btn btn-md btn-primary" (click)="closeModal()">Annuler</button>
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

    deleteData() {

        this.serv.deleteData(this.id).subscribe(resp => {console.log(resp);
                this.getData();
              //  this.serv.updatedData(this.data);
        });
    }

}