/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbAuthSocialLink} from '@nebular/auth';
import {getDeepFromObject} from '@nebular/auth/helpers';
import {AppService} from '../../../../app.service';


import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-login',
  template: `
    <nb-auth-block>
      <h2 class="title">Se connecter</h2>
      <small class="form-text sub-title">Bienvenue! Connectez vous avec votre Pseudo ou Email</small>

      <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">

        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Vérifiez votre  : login / mot de passe!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>

        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Merci !</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Pseudo / Adresse Email </label>
          <input name="email" [(ngModel)]="user.email" id="input-email" pattern=".+@.+\..+"
                 class="form-control" placeholder="Pseudo / Adresse Email" #email="ngModel"
                 [class.form-control-danger]="email.invalid && email.touched" autofocus
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors['required']">
            l'email est obligatoire!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors['pattern']">
        Vérifiez l'adresse email !
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">Mot de Passe</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control" placeholder="Mot de Passe" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors['required']">
              Le mot de passe est obligatoire!
          </small>
          <small     class="form-text error"    *ngIf="password.invalid && password.touched && (password.errors['minlength'] || password.errors['maxlength'])">
              Le mot de passe doit contenir  
            de {{ getConfigValue('forms.validation.password.minLength') }}
            à {{ getConfigValue('forms.validation.password.maxLength') }}
            caractères
          </small>
        </div>

        <div class="form-group accept-group col-sm-12">
          <nb-checkbox name="rememberMe" [(ngModel)]="user.rememberMe">Se souvenir de moi</nb-checkbox>
          <a class="forgot-password" routerLink="../request-password">Mot de passe oublié?</a>
        </div>

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          se connecter
        </button><br>
          <small class="form-text sub-title">Nouveau ?<strong><a href="/#/auth/register"> Inscription ici</a></strong></small>

      </form>

      <!--<div class="links">

        <ng-container *ngIf="socialLinks && socialLinks.length > 0">
          <small class="form-text"> connecter avec:</small>

          <div class="socials">
            <ng-container *ngFor="let socialLink of socialLinks">
              <a *ngIf="socialLink.link"
                 [routerLink]="socialLink.link"
                 [attr.target]="socialLink.target"
                 [attr.class]="socialLink.icon"
                 [class.with-icon]="socialLink.icon">{{ socialLink.title }}</a>
              <a *ngIf="socialLink.url"
                 [attr.href]="socialLink.url"
                 [attr.target]="socialLink.target"
                 [attr.class]="socialLink.icon"
                 [class.with-icon]="socialLink.icon">{{ socialLink.title }}</a>
            </ng-container>
          </div>
        </ng-container>
         <small class="form-text">
          Nouveau? <a routerLink="../register"><strong>Inscription ici</strong></a>
        </small>
      </div>-->
    </nb-auth-block>
  `,
})

export class NgxLoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  URL:any;
  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router,
              private serv: AppService,) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.URL= environment.API_URL;

  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
   localStorage.setItem('email', this.user.email);
   console.log('email= '+this.user.email);
        this.messages = result.getMessages();

      } else {
        this.errors = result.getErrors();
      }

      let redirect = result.getRedirect();
      if (redirect) {
            let  statusb:any;
   // this.analytics.trackPageViews();
    this.serv.checkAccess().subscribe(resp => {console.log( resp);
      console.log("status = "+resp.result);
      status=resp.result;
      if (status=="admin"){redirect="/dashboard";}
      if (status=="simple"){redirect="/network";}
	     localStorage.setItem('status', status);

     
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
     });
     } 
    });
  
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
