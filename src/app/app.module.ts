/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppService} from './app.service';
import {AuthenticationService} from './authentication.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxAuthComponent} from './@theme/components/auth/auth.component';
import {NgxAuthBlockComponent} from './@theme/components/auth/auth-block/auth-block.component';
import {NgxLoginComponent} from './@theme/components/auth/login/login.component';
import {NgxRegisterComponent} from './@theme/components/auth/register/register.component';
import {NgxRequestPasswordComponent} from './@theme/components/auth/request-password/request-password.component';
import {NgxResetPasswordComponent} from './@theme/components/auth/reset-password/reset-password.component';
import {NgxLogoutComponent} from './@theme/components/auth/logout/logout.component';
import { FileUploadModule } from 'ng2-file-upload';

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
//import the ng2-file-upload directive so we can add it to our declarations.
//import { FileSelectDirective } from 'ng2-file-upload';
const routes: Routes = [
   
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
      },
      {
        path: 'logout',
        component: NgxLogoutComponent,
      },
      {
        path: 'request-password',
        component: NgxRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NgxResetPasswordComponent,
      },
    
];


@NgModule({
  declarations: [AppComponent, NgxAuthComponent,
    NgxAuthBlockComponent,
    NgxLoginComponent,
    NgxRegisterComponent,
    NgxRequestPasswordComponent,
    NgxResetPasswordComponent,
    //FileSelectDirective,
    NgxLogoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
      FileUploadModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [AppService,AuthenticationService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
