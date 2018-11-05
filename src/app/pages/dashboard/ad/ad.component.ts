import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnDestroy {
 @Input() category: Category;
    currentTheme: string;
    themeSubscription: any;
    source = 'assets/hotel.jpg';

    constructor(private themeService: NbThemeService) {
    ////////    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
     //////       this.currentTheme = theme.name;
     /////   });
    }

   ngOnDestroy() {
/////        this.themeSubscription.unsubscribe();
    }

}
export class Category {
  public titre: string;
  public type: string;

  constructor(name: string, type: string) {
    this.titre = name;
    this.type = type;
  }
}