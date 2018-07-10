import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
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
import {ModalComponent} from './directories/modal/modal.component';
import {FormsModule} from '@angular/forms';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
      FormsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    BlogComponent,
    DirectoriesComponent,
    ContactComponent,
    CategoriesComponent,
    ArticlesComponent,
    AnnoncesComponent,
      ModalComponent,
  ],
    entryComponents: [
        ModalComponent,
    ],
})
export class PagesModule {
}
