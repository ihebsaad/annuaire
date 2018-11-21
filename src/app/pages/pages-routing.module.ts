import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccueilComponent } from './accueil/accueil.component';
import {BlogComponent} from './blog/blog.component';
import {ContactComponent} from './contact/contact.component';
import {DirectoriesComponent} from './directories/directories.component';
import {CategoriesComponent} from './categories/categories.component';
import {ArticlesComponent} from './articles/articles.component';
import {AnnoncesComponent} from './annonces/annonces.component';
import {ListingComponent} from './listing/listing.component';
import {UsersComponent} from './users/users.component';
import {MapComponent} from './dashboard/search-map/map/map.component';
import {ProfileComponent} from './profile/profile.component';
import {InterestComponent} from "./../interest/interest.component";
import {AdsComponent} from "./ads/ads.component";


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
          path: 'listing',
          component: ListingComponent,
      },
      {
          path: 'users',
          component: UsersComponent,
      },
      {
          path: 'profile',
          component: ProfileComponent,
      },
      {
          path: 'interest',
          component: InterestComponent,
      },
      {
          path: 'ads',
          component: AdsComponent,
      },
      {
      path: '',
    //  redirectTo: 'accueil',
      component: AccueilComponent,
     // pathMatch: 'full',
    },
  ] /*,
   { path: 'entites', component: EntitesComponent, children: [
   // { path: '', component: RecipeStartComponent },
  //  { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: EntiteDetailsComponent },
 //   { path: ':id/edit', component: RecipeEditComponent },
  ] }*/
}];


const config: ExtraOptions = {
    //useHash: true,

};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class PagesRoutingModule {
}
