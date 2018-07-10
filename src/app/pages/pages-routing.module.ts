import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BlogComponent} from './blog/blog.component';
import {ContactComponent} from './contact/contact.component';
import {DirectoriesComponent} from './directories/directories.component';
import {CategoriesComponent} from './categories/categories.component';
import {ArticlesComponent} from './articles/articles.component';
import {AnnoncesComponent} from './annonces/annonces.component';
import {MapComponent} from './dashboard/search-map/map/map.component';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
      {
          path: 'map',
          component: MapComponent,
      },
      {
          path: 'blog',
          component: BlogComponent,
      },
      {
          path: 'contact',
          component: ContactComponent,
      },
      {
          path: 'directories',
          component: DirectoriesComponent,
      },
      {
          path: 'categories',
          component: CategoriesComponent,
      },
      {
          path: 'annonces',
          component: AnnoncesComponent,
      },
      {
          path: 'articles',
          component: ArticlesComponent,
      },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
