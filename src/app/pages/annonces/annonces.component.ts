import { Component, OnInit } from '@angular/core';
import {AnnoncesService} from './annonces.service';
import {LocalDataSource} from 'ng2-smart-table';


@Component({
  selector: 'annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss'],
  providers: [AnnoncesService]

})
export class AnnoncesComponent implements OnInit {

  obj: any;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,

    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      titre: {
        title: 'titre',
        type: 'string',
      },
      type: {
        title: 'details',
        type: 'string',
      },
      auteur: {
        title: 'auteur',
        type: 'string',
      }
    },
  };

  constructor(private serv : AnnoncesService) { }

  ngOnInit() {

    this.showData();
  }

  showData() {

    this.serv.getData().subscribe(resp => {console.log(resp);

      this.obj = resp['annonces'];
      this.source.load(this.obj);

    });



  }

  sendData(obj: any) {

    this.serv.addData(obj).subscribe(resp => {console.log(resp);
    });

  }

  addRecord(event): void {
    if((event['newData']['titre'] !== '')&&(event['newData']['details'] !== '')&&(event['newData']['auteur'] !== '') ) {
      event.confirm.resolve();
      console.log(event['newData']);
      this.sendData(event['newData']);
    }else {
      event.confirm.reject();
      this.settings.add.confirmCreate = false;
    }

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Etes vous sûres de vouloir supprimer ?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}