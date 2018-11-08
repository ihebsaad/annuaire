import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module'; 
import { AccueilModule } from './accueil/accueil.module';  
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { BlogComponent } from './blog/blog.component';
import { DirectoriesComponent } from './directories/directories.component';
import { ContactComponent } from './contact/contact.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { CategoriesComponent } from './categories/categories.component';
import { ArticlesComponent } from './articles/articles.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { ListingComponent } from './listing/listing.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import {ModalComponent} from './directories/modal/modal.component';
import {ModalComponent2} from './categories/modal/modal.component';
import {ModalComponent3} from './annonces/modal/modal.component';
import {ModalComponent4} from './articles/modal/modal.component';
import {ModalComponent5} from './users/modal/modal.component';
import {FormsModule} from '@angular/forms';
import {Ng2PaginationModule} from 'ng2-pagination';
//////import { FileSelectDirective } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { RateComponent } from './dashboard/rate/rate.component';
import {InterestComponent} from "./../interest/interest.component";
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    AccueilModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
      FormsModule,HttpModule,
      Ng2PaginationModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    BlogComponent,//////FileSelectDirective,
    DirectoriesComponent,
    ContactComponent,
    CategoriesComponent,RateComponent,
    ArticlesComponent,
    AnnoncesComponent,ListingComponent,
    UsersComponent,ProfileComponent,InterestComponent,
      ModalComponent,ModalComponent2,ModalComponent3,ModalComponent4,ModalComponent5
  ],
    entryComponents: [
        ModalComponent,ModalComponent2,ModalComponent3,ModalComponent4,ModalComponent5
    ],
})
export class PagesModule {
}
