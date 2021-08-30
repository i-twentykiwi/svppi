import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

    student: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: FirebaseAuthService,
        private firestoreService: FirestoreService,
    ) {
        const id = this.route.snapshot.params['id'];
        console.log(id);
        this.authService.getProfileDataSource().subscribe((user) => {

            this.firestoreService.getStudentbyId('students', id).pipe(
                map(actions => actions.payload.data() as any)
            ).subscribe(
                (student) => {
                    if(student) {
                        this.student = student;
                        console.log(student);
                    } else {
                        this.firestoreService.getStudentbyId('nadeem_students', id).pipe(
                            map(actions => actions.payload.data() as any)
                        ).subscribe(
                            (student) => {
                                if (student) {
                                    this.student = student;
                                    console.log(student);
                                } else {
                                    console.log('data not found');
                                }
                            },
                            (error) => {
                                console.log(error.message);
                            }
                        );
                    }

                },
                (error) => {
                    console.log(error.message);
                }
            );

        })
    }

    goBack() {
        this.router.navigate(['admin/dashboard']);
    }
}