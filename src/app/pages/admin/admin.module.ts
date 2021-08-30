import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TableService } from 'src/app/shared/services/table.service';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastComponent } from 'src/app/shared/layouts/toast/toast.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
    declarations: [
        AdminComponent,
        LoginComponent,
        DashboardComponent,
        DetailsComponent,
        ToastComponent,
    ],
    imports: [
        NgbModule,
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
    ],
    providers: [ FirebaseAuthService, FirestoreService, ToastService, TableService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }