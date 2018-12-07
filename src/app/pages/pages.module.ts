import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module'; 
import { AccueilModule } from './accueil/accueil.module';  
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule, } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { BlogComponent } from './blog/blog.component';
import { AdsComponent } from './ads/ads.component';
import { DirectoriesComponent } from './directories/directories.component';
import { ContactComponent } from './contact/contact.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { CategoriesComponent } from './categories/categories.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { ListingComponent } from './listing/listing.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { NetworkComponent } from './network/network.component';
import {ModalComponent} from './directories/modal/modal.component';
import {ModalComponent2} from './categories/modal/modal.component';
import {ModalComponent3} from './annonces/modal/modal.component';
import {ModalComponent4} from './articles/modal/modal.component';
import {ModalComponent5} from './users/modal/modal.component';
import {ModalComponent6} from './network/modal/modal.component';
import {FormsModule} from '@angular/forms';
import {Ng2PaginationModule} from 'ng2-pagination';
//////import { FileSelectDirective } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { RateComponent } from './dashboard/rate/rate.component';
import {InterestComponent} from "./../interest/interest.component";
import {FileUploadModule} from "ng2-file-upload";
import {ExtraOptions} from "@angular/router";
import {AnnonceComponent} from "./annonce/annonce.component";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {HttpClientModule} from "@angular/common/http";
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
      Ng2PaginationModule,FileUploadModule,AngularEditorModule,
    HttpClientModule,

  ],
  declarations: [
    ...PAGES_COMPONENTS,
    BlogComponent,//////FileSelectDirective,
    DirectoriesComponent,AdsComponent,
    ContactComponent,
    CategoriesComponent,RateComponent,
    ArticlesComponent,ArticleComponent,
    AnnoncesComponent,ListingComponent,AnnonceComponent,NetworkComponent,
    UsersComponent,ProfileComponent,InterestComponent,
      ModalComponent,ModalComponent2,ModalComponent3,ModalComponent4,ModalComponent5,ModalComponent6
  ],
    entryComponents: [
        ModalComponent,ModalComponent2,ModalComponent3,ModalComponent4,ModalComponent5,ModalComponent6
    ],
})




export class PagesModule {
}



