/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject,Input } from '@angular/core';
import { Router } from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbAuthSocialLink} from '@nebular/auth';
import {getDeepFromObject} from '@nebular/auth/helpers';
import{ NgxLoginComponent } from '../login/login.component';


@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  template: `
    <nb-auth-block>
      <h2 class="title">Inscription</h2>
      <form (ngSubmit)="register()" #form="ngForm">

        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Erreur !</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Bienvenue!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>
        <div class="form-group">
          <label for="input-name" class="sr-only">Nom </label>
          <input name="fullName" [(ngModel)]="user.fullName" id="input-name" #fullName="ngModel"
                 class="form-control" placeholder="Nom Complet"
                 [class.form-control-danger]="fullName.invalid && fullName.touched"
                 [required]="getConfigValue('forms.validation.fullName.required')"
                 [minlength]="getConfigValue('forms.validation.fullName.minLength')"
                 [maxlength]="getConfigValue('forms.validation.fullName.maxLength')"
                 autofocus>
          <small class="form-text error" *ngIf="fullName.invalid && fullName.touched && fullName.errors['required']">
            Le Nom est obligatoire!
          </small>
          <small
            class="form-text error"
            *ngIf="fullName.invalid && fullName.touched && (fullName.errors['minlength'] || fullName.errors['maxlength'])">
            le nom doit contenir
            de  {{getConfigValue('forms.validation.fullName.minLength')}}
            à {{getConfigValue('forms.validation.fullName.maxLength')}}
            caractères
          </small>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Email </label>
          <input name="email" [(ngModel)]="user.email" id="input-email" #email="ngModel"
                 class="form-control" placeholder="Adresse Email " pattern=".+@.+\..+"
                 [class.form-control-danger]="email.invalid && email.touched"
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors['required']">
           L'email est obligatoire!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors['pattern']">
            Email incorrect !
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">Mot de passe</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control" placeholder="Mot de passe" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors['required']">
            Le mot de passe est obligatoire !
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.errors['minlength'] || password.errors['maxlength'])">
            Le mot de passe doit contenir 
            de {{ getConfigValue('forms.validation.password.minLength') }}
            à {{ getConfigValue('forms.validation.password.maxLength') }}
            caractères
          </small>
        </div>

        <div class="form-group">
          <label for="input-re-password" class="sr-only">Confirmation </label>
          <input
            name="rePass" [(ngModel)]="user.confirmPassword" type="password" id="input-re-password"
            class="form-control" placeholder="Confirmation" #rePass="ngModel"
            [class.form-control-danger]="(rePass.invalid || password.value != rePass.value) && rePass.touched"
            [required]="getConfigValue('forms.validation.password.required')">
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass.errors['required']">
             la confirmation est obligatoire!
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">
            Vérifiez les deux champs de mot de passe .
          </small>
        </div>

        <div class="form-group accept-group col-sm-12" *ngIf="getConfigValue('forms.register.terms')">
          <nb-checkbox name="terms" [(ngModel)]="user.terms" [required]="getConfigValue('forms.register.terms')">
            Vous Acceptez les <a href="#" target="_blank"><strong>Termes et Conditions</strong></a>
          </nb-checkbox>
        </div>

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Enregistrer
        </button>
      </form>

      <div class="links">

        <ng-container *ngIf="socialLinks && socialLinks.length > 0">
          <small class="form-text">connecter avec:</small>

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
          Vous avez un compte? <a routerLink="../auth/login"><strong> Connexion</strong></a>
        </small>
      </div>
    </nb-auth-block>
  `,
})
export class NgxRegisterComponent {
// @Input() logincpn: NgxLoginComponent;
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
       console.log('here success register');
       //this.logincpn.login();
     //  console.log('after login');
     // Login after register
 
    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
   localStorage.setItem('email', this.user.email);
   console.log('email= '+this.user.email);
        this.messages = result.getMessages();

      } else {
        this.errors = result.getErrors();
      }


});


     //end login after register
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
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

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }
  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
