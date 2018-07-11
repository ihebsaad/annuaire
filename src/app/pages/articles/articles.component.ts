import { Component, OnInit } from '@angular/core';
import {ArticlesService} from './articles.service';
import {LocalDataSource} from 'ng2-smart-table';



@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticlesService]

})
export class ArticlesComponent implements OnInit {

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
        title: 'title',
        type: 'string',
      },
      type: {
        title: 'contenu',
        type: 'string',
      },
      auteur: {
        title: 'auteur',
        type: 'string',
      }
    },
  };

  constructor(private serv : ArticlesService) { }

  ngOnInit() {

    this.showData();
  }

  showData() {

    this.serv.getData().subscribe(resp => {console.log(resp);

      this.obj = resp['articles'];
      this.source.load(this.obj);

    });



  }

  sendData(obj: any) {

    this.serv.addData(obj).subscribe(resp => {console.log(resp);
    });

  }

  addRecord(event): void {
    if((event['newData']['titre'] !== '')&&(event['newData']['contenu'] !== '')&&(event['newData']['auteur'] !== '') ) {
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