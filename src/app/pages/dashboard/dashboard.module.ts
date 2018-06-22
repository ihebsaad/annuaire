import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {AgmCoreModule} from '@agm/core';
import {SearchComponent} from './search-map/search/search.component';
import {MapComponent} from './search-map/map/map.component';
import { AdComponent } from './ad/ad.component';



@NgModule({
  imports: [
    ThemeModule,  AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDURztPvnIS1JTvUzDTrEGxyE6lFBXJp9I',
          libraries: ['places'],
      }),
  ],
  declarations: [
    DashboardComponent, SearchComponent, MapComponent, AdComponent,
  ],
})
export class DashboardModule { }
