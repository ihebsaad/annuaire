import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {DirectoriesService} from '../../directories/directories.service';
import {Rep} from '../../directories/model/rep';
@Component({
  selector: 'ngx-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss'],
})
export class FavorisComponent implements OnDestroy {
id:any; note:any;
 model1 = new Rep('','','','','','');
    data: any;
    data1="";
    currentTheme: string;
    themeSubscription: any;
    source = 'assets/hotel.jpg';
    countNote:any;

    constructor(private themeService: NbThemeService,private servDirect: DirectoriesService) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.currentTheme = theme.name;
        });



        this.servDirect.getNote().subscribe(resp => {console.log(resp);
          
         this.countNote = resp['notes'];
console.log(this.countNote);
console.log(this.countNote.length);


    var max;0
    for (var i=0 ; i< this.countNote.length ; i++) {
        if (!max || ( this.countNote[i]['noteavg']) > (max['noteavg']))
            max =  this.countNote[i];
    }
    console.log( max);
     console.log('Meilleure note' +max.noteavg);
     this.note=max.noteavg;
let decimalPart = parseFloat((this.note - Math.floor(this.note)).toFixed(1));
if (decimalPart != 0.5)
{
  this.note=Math.round(this.note);
  console.log(this.note);
}

     console.log('ID meilleur repertoire ' +max._id);
/*switch(this.note) {
    case 0:
     (document.getElementById('rating0') as HTMLInputElement).select();  
        break;
    case n:
        code block
        break;
    default:
        code block
}
*/

      this.id = max._id;
      this.servDirect.getDataById(this.id).subscribe(resp => {console.log(resp);
          console.log(resp['repertoires']);
          this.data1 = resp['repertoires'];
         // this.model1 = new Rep(this.data1.titre,this.data1.categorie,this.data1.adresse,this.data1.ville,this.data1.tel,this.data1.auteur);
console.log(this.data1);
      });

  

      }); 
    }

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }

}
