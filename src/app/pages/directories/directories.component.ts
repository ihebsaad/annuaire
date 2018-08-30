import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, ElementRef,DoCheck, OnInit} from '@angular/core';
import {DirectoriesService} from './directories.service';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {Rep} from './model/rep';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import {AppService} from '../../app.service';
//import the file uploader plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//define the constant url we would be uploading to.
let URL = 'http://localhost:3000/repertoires/upload';

@Component({
  selector: 'ngx-directories',
  templateUrl: './directories.component.html',
  styleUrls: ['./directories.component.scss'],
})

export class DirectoriesComponent implements OnInit, AfterContentInit {
    model: any = {};
    model1 = new Rep('','','','','','','','');
    data: any;
    data1: any;
    id: any;
    test: boolean = false;
    test1: boolean = false;
    page : any;
    username:any;
pathimage:any; fname:any;
public uploader:FileUploader = new FileUploader({url: URL/*+'/'+this.fname, itemAlias: 'photo'*/});
  constructor(private serv: DirectoriesService, private modalService: NgbModal,
private servApp: AppService,private http: Http, private el: ElementRef
    ) {

this.servApp.getusername().subscribe(resp => {
  console.log( resp);
      console.log("name** = "+resp.result);
       this.username=resp.result;
         //return resp.result; 
      });
 //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
       this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
       //overide the onCompleteItem property of the uploader so we are 
       //able to deal with the server response.
       this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
                        

        };

  }

ngOnInit() {
   this.getData();
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            console.log('response'+response);
             console.log('here');
            console.log(item);
              //item.filename=item.file.name;
                          var pos=response.length;
     this.pathimage = item.file.name;
           console.log('pathimage= '+this.pathimage);
          
        };
    }
    //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  /*
    //the function which handles the file upload without using a plugin.
    upload() {
      console.log("here from directories.component.ts");
    //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
                formData.append('photo', inputEl.files.item(0));
            //call the angular http method
           this.fname= inputEl.files.item(0).name;

            this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(URL/*+'/'+this.fname*//*,/* formData).map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
                  // console.log('here');
                  // console.log(success.path);
                 //   console.log('here2');
                   //console.log(success._body);
                    // console.log(success._body["path"]);
                   
                         //alert(success._body);
                },
                (error) => alert(error))
          }
       }*/
    ngAfterContentInit() {
      this.afficher();
    }
getUsername(){
 this.servApp.getusername().subscribe(resp => {
  console.log( resp);
      console.log("name** = "+resp.result);
       this.username=resp.result;
         //return resp.result; 
      });

}


  getData() {

      this.serv.getData().subscribe(resp => {console.log(resp);
          console.log(resp['repertoires']);
          this.data = resp['repertoires'];

      });

  }
approveDirectory(f: NgForm){
 this.serv.approve(this.id).subscribe(resp => {console.log(resp);

            this.getData();
                       

        });

}
  getDataById(id:any) {
      this.id = id;
      this.serv.getDataById(id).subscribe(resp => {console.log(resp);
          console.log(resp['repertoires']);
          this.data1 = resp['repertoires'];
          this.model1 = new Rep(this.data1.titre,this.data1.categorie,this.data1.adresse,this.data1.ville,this.data1.tel,this.data1.auteur,this.data1.longitude,this.data1.latitude);

      });

  }


    showStaticModal(obj:any) {
        const activeModal = this.modalService.open(ModalComponent, {
            size: 'lg',
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

        if (this.test==false) {this.test=true;}else{this.test=false;}

    }

    cacherFormulaire() {

        if (this.test==false) {this.test=true;}else{this.test=false;}
    }

    AfficherFormulaire1() {

        if (this.test1==false) {this.test1=true;}else{this.test1=false;}

    }

    cacherFormulaire1() {

        if (this.test1==false) {this.test1=true;}else{this.test1=false;}
    }

    afficher() {
      this.serv.data.subscribe(data => {
          //do what ever needs doing when data changes
          this.data = data;
      });
    }


}
