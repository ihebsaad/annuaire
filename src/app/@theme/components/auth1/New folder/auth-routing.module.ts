import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    // .. here goes our components routes
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
/*

export const routes: Routes = [
    {
        path: '',
        component: NgxAuthComponent,
        children: [
            {
                path: '',
                component: NgxLoginComponent,
            },
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
        ],
    }
];

    */