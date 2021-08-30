import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['admin/login']);
const redirectAuthorizedToHome = () => redirectLoggedInTo(["admin/dashboard"]);

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ResultComponent } from './pages/result/result.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';
import { ContactComponent } from './pages/contact/contact.component';

import { AdminRoutingModule } from './pages/admin/admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { StudentComponent } from './pages/student/student.component';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "courses",
    component: CoursesComponent,
  },
  {
    path: "result",
    component: ResultComponent,
  },
  {
    path: "legal-notice",
    component: LegalNoticeComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "student-details/:id",
    component: StudentComponent,
  },
  {
    path: "thankyou",
    component: ThankyouComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
