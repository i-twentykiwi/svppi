import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, from } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthService {

    currentUser: any;
    userProviderAdditionalInfo: any;
    redirectResult: Subject<any> = new Subject<any>();

    constructor(
        public angularFireAuth: AngularFireAuth,
    ) {
        this.angularFireAuth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.currentUser = user;
            } else {
                // No user is signed in.
                this.currentUser = null;
            }
        });

        // when using signInWithRedirect, this listens for the redirect results
        this.angularFireAuth.getRedirectResult()
            .then((result) => {
                // result.credential.accessToken gives you the Provider Access Token. You can use it to access the Provider API.
                if (result.user) {
                    this.setProviderAdditionalInfo(result.additionalUserInfo.profile);
                    this.currentUser = result.user;
                    this.redirectResult.next(result);
                }
            }, (error) => {
                this.redirectResult.next({ error: error.code });
            });
    }


    public getProfileDataSource() {
        return this.angularFireAuth.user
            .pipe(filter((user) => user != null),
                map((user) => {
                    return {
                        "uid": user.uid,
                        "name": user.displayName,
                        "photoUrl": user.photoURL,
                        "phoneNumber": user.phoneNumber,
                        "email": user.email
                    };
                }),
                take(1) // this.angularFireAuth.user never completes so we use take(1) in order to complete after the first value is emitted
            );
    }

    getRedirectResult(): Observable<any> {
        return this.redirectResult.asObservable();
    }

    setProviderAdditionalInfo(additionalInfo: any) {
        this.userProviderAdditionalInfo = { ...additionalInfo };
    }

    signOut(): Observable<any> {
        return from(this.angularFireAuth.signOut());
    }

    signInWithEmail(email: string, password: string): Promise<any> {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    }

    signUpWithEmail(email: string, password: string): Promise<any> {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    }
}