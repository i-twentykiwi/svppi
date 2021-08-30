import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// FIREBASE IMPORTS
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// ALL ENVIRONMENT VARIABLES
import { environment } from "../environments/environment";

// ALL SERVICES
import { FirebaseAuthService } from './shared/services/firebase-auth.service';
import { FirestoreService } from './shared/services/firestore.service';


import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ResultComponent } from './pages/result/result.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';
import { ContactComponent } from './pages/contact/contact.component';
import { StudentComponent } from './pages/student/student.component';
import { ToastService } from './shared/services/toast.service';
import { TableService } from './shared/services/table.service';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    CoursesComponent,
    ResultComponent,
    LegalNoticeComponent,
    ContactComponent,
    StudentComponent,
    ThankyouComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuthGuard, 
    FirebaseAuthService, 
    FirestoreService, 
    ToastService, 
    TableService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
