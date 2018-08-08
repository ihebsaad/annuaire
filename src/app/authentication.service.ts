import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';
import {getDeepFromObject} from '@nebular/auth/helpers';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
strategy: string = '';
  redirectDelay: number = 0;
  constructor(protected service: NbAuthService,  private http: HttpClient, private router: Router,
              @Inject(NB_AUTH_OPTIONS) protected options = {}) {
  this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');

    
  }
ngOnInit(): void {
    this.logout(this.strategy);
  }
  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
 /*   const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }*/
 let  email=localStorage.getItem('email');
 //let loggedin=false;
if (email== null)
{
  return false;
     //  console.log(" Not logged in");
}
else if (email.length > 0 ){
     return true;
    //   console.log(" loggedin ");
}

  }

    public isAdmin(): boolean {

      return false;
    }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/${type}`, user);
    } else {
      base = this.http.get(`/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

 /* public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }*/

logout(strategy: string): void {
 //   this.service.logout(strategy).subscribe((result: NbAuthResult) => {
localStorage.removeItem('email');      
localStorage.removeItem('auth_app_token');
   /*/  const redirect = result.getRedirect();
  //  if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
  //    }
 //   });*/
    //localStorage.removeItem(key);

    console.log('logout')
  }
 getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}

