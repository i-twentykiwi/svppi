import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ToastService } from 'src/app/shared/services/toast.service';

export interface Student {
  id: string;
  enrollmentNo: string;
  name: string;
  fatherName: string;
  dob: string;
  courseName: string;
  courseShortForm: string;
  sessionStart: string;
  sessionEnd: string;
  profilePic: string;
  result1: object;
  result2: object;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  searchResultForm = new FormGroup({
    enrollmentNo: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router,
    private toastService: ToastService,
    private firestore: FirestoreService,
  ) { }

  searchResult() {
    if(this.searchResultForm.valid) {
      const enrollmentNo = this.searchResultForm.get('enrollmentNo').value;
      const dob = this.searchResultForm.get('dob').value;

      this.firestore.searchStudent('students', enrollmentNo, dob).pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Student;
            data.id = a.payload.doc.id;
            return data;
          })
        })
      ).subscribe((student) => {
        if(student[0]) {
          this.router.navigate(['student-details', student[0].id]);
        } else {
          this.firestore.searchStudent('nadeem_students', enrollmentNo, dob).pipe(
            map((actions) => {
              return actions.map((a) => {
                const data = a.payload.doc.data() as Student;
                data.id = a.payload.doc.id;
                return data;
              })
            })
          ).subscribe((student) => {
            if (student[0]) {
              this.router.navigate(['student-details', student[0].id]);
            } else {
              alert("Result is not published yet!!!");
            }
          });
        }
      });

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
