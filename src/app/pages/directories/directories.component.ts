import { Component, OnInit } from '@angular/core';
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
  providers: [DirectoriesService],
})
export class DirectoriesComponent implements OnInit {
    model: any = {};
  constructor(private serv: DirectoriesService, private modalService: NgbModal) { }

  ngOnInit() {
  }


    showStaticModal() {
        const activeModal = this.modalService.open(ModalComponent, {
            size: 'sm',
            backdrop: 'static',
            container: 'nb-layout',
        });

        activeModal.componentInstance.modalHeader = 'Confirmation';
        activeModal.componentInstance.modalContent = `Est ce que vous voulez confirmer cette action ?`;
    }

    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false

        this.serv.addData(f.value).subscribe(resp => console.log(resp));

    }
}
