import { Component, OnInit } from '@angular/core';
import {CategoriesService} from './categories.service';
import {LocalDataSource} from 'ng2-smart-table';
@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]

})


export class CategoriesComponent implements OnInit {

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
        title: 'type',
        type: 'number',
      }
    },
  };

  constructor(private serv : CategoriesService) { }

  ngOnInit() {

    this.showData();
  }

  showData() {

    this.serv.getData().subscribe(resp => {console.log(resp);

      this.obj = resp['categories'];
      this.source.load(this.obj);

    });



  }

  sendData(obj: any) {

    this.serv.addData(obj).subscribe(resp => {console.log(resp);
    });

  }

  addRecord(event): void {
    if((event['newData']['titre'] !== '')&&(event['newData']['type'] !== '') ) {
      event.confirm.resolve();
      console.log(event['newData']);
      this.sendData(event['newData']);
    }else {
      event.confirm.reject();
      this.settings.add.confirmCreate = false;
    }

  }
editRecord(event): void{
  console.log(event);
event.confirm.resolve();
this.serv.editData(event.data._id,event.newData).subscribe(resp => {console.log(resp);});


}

  onDeleteConfirm(event): void {
    if (window.confirm('Etes vous sûres de vouloir supprimer ?')) {
      event.confirm.resolve();
      console.log(" id = "+event.data._id);

this.serv.deleteData(event.data._id).subscribe(resp => {console.log(resp);});
console.log("After delete");
    } else {
      event.confirm.reject();
    }
  }
}