import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  })

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    ) { }

  ngOnInit(): void {
  }

  sendEmail() {
    if(this.contactForm.valid) {
      this.http.post("https://formsubmit.co/i.varunrana@gmail.com", JSON.stringify(this.contactForm.value), { responseType: 'text' })
      .subscribe(
        (response) => {
          console.log(response);
        }, (error) => {
          console.log(error.message)
        }
      )
    } else {
      console.log("Invalid Form! Please fill all the required fields.");
      this.showDanger("Invalid Form! Please fill all the required fields.");
    }
  }

  showSuccess(msg) {
    this.toastService.show(msg, { classname: 'bg-success text-light', delay: 4000 });
  }

  showDanger(msg) {
    this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 4000 });
  }

}

