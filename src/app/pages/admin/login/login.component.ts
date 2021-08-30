import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  adminForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submitError: string;
  authRedirectResult: Subscription;

  constructor(
    public router: Router,
    private ngZone: NgZone,
    private authService: FirebaseAuthService
  ) { 
    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService.getRedirectResult()
      .subscribe(result => {
        if (result.user) {
          this.redirectLoggedUserToProfilePage();
        } else if (result.error) {
          this.submitError = result.error;
        }
      });

    this.adminForm.patchValue({ email: 'admin@svppi.org'});
  }

  login() {
    if(this.adminForm.valid) {
      this.authService.signInWithEmail(this.adminForm.get('email').value, this.adminForm.get('password').value)
      .then(user => {
        // navigate to user profile
        this.redirectLoggedUserToProfilePage();
      })
      .catch(error => {
        this.submitError = error.message;
      });
    } else {
      this.submitError = "Please enter password!";
    }  
  }

  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      this.router.navigate(['admin/dashboard']);
    });
  }

}
