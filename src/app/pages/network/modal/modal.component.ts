import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" style="text-align: center">
      {{ modalContent }}
        <textarea style="width:350px;height:350px;font-wight:bold;padding:20px 20px 20px 20px;border:2px solid #2196f3 "></textarea>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-hero-success" (click)=" closeModal()">Envoyer</button>
        <button class="btn btn-md btn-hero-danger" (click)="closeModal()">Annuler</button>
  
    </div>
  `,
})
export class ModalComponent6 {

  modalHeader: string;
  modalContent = ``;
  id: any;
  data: any;

  constructor(private activeModal: NgbActiveModal ) { }

  closeModal() {
    this.activeModal.close();
  }

}

