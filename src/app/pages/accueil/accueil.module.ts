import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { AccueilComponent } from './accueil.component';
import {AgmCoreModule} from '@agm/core';
import {SearchComponent} from './search-map/search/search.component';
import {MapComponent} from './search-map/map/map.component';
import { AdComponent } from './ad/ad.component';
import {Ng2PaginationModule} from 'ng2-pagination';


@NgModule({
  imports: [
    ThemeModule,Ng2PaginationModule,  AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDURztPvnIS1JTvUzDTrEGxyE6lFBXJp9I',
          libraries: ['places'],
      }),
  ],
  declarations: [
    AccueilComponent, SearchComponent, MapComponent, AdComponent,
  ],
})
export class AccueilModule { }
