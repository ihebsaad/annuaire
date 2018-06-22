import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnDestroy {

    currentTheme: string;
    themeSubscription: any;
    source = 'assets/hotel.jpg';

    constructor(private themeService: NbThemeService) {
        this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
            this.currentTheme = theme.name;
        });
    }

    ngOnDestroy() {
        this.themeSubscription.unsubscribe();
    }

}
