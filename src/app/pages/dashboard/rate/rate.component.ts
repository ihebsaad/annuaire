import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnDestroy {


    constructor() {
       
    }

    ngOnDestroy() {
       
    }
rate(value){
  console.log(value);
}
}
