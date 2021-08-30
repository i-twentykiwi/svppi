import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['admin/login']);
const redirectAuthorizedToHome = () => redirectLoggedInTo(["admin/dashboard"]);


import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectAuthorizedToHome },
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: "details/:id",
        component: DetailsComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }