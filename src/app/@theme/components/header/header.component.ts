import { Component, Input, OnInit } from '@angular/core';
//import { LOGGEDIN } from '../../../app.component';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {AppService} from '../../../app.service';
import { AuthenticationService } from '../../../authentication.service';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';
username:any;
  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private serv: AppService,
              public auth: AuthenticationService) {
    this.serv.getusername().subscribe(resp => {
  console.log( resp);
      console.log("name = "+resp.result);
       this.username=resp.result;
         //return resp.result; 
      });
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);



        let  statusb:any;
   // this.analytics.trackPageViews();
    this.serv.checkAccess().subscribe(resp => {console.log( resp);
      console.log("status = "+resp.result);
      status=resp.result;
      if (status=="simple"){statusb=true;}
      else {statusb=false;}
          
      });

/*  let  email=localStorage.getItem('email');
 let loggedin=false;
if (email== null)
{
    loggedin=false;
       console.log(" Not logged in");
}
else if (email.length > 0 ){
     loggedin=true;
       console.log(" loggedin ");
}*/
//Get user name

  }
/*ngOnChanges(){
  let  email=localStorage.getItem('email');
 let loggedin=false;
if (email== null)
{
    loggedin=false;
       console.log(" Not logged in from ng on change");
}
else if (email.length > 0 ){
     loggedin=true;
       console.log(" loggedin from ng on change");
}
}*/
 

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
