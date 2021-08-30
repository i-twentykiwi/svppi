import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  student: any;
  totalMarks: number;
  obtainedMarks: number;
  percentage: string;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirestoreService
  ) {
    const id = this.route.snapshot.params['id'];

    this.firebase.getStudentbyId('students', id).pipe(
      map(actions => actions.payload.data() as any)
    ).subscribe((student) => {
      if(student) {
        this.student = student;
        this.totalMarks = this.student.result1.totalMarks + this.student.result2.totalMarks;
        this.obtainedMarks = this.student.result1.obtainedMarks + this.student.result2.obtainedMarks;
        this.percentage = ((this.obtainedMarks / this.totalMarks) * 100).toFixed(1);
      } else {
        this.firebase.getStudentbyId('nadeem_students', id).pipe(
          map(actions => actions.payload.data() as any)
        ).subscribe((student) => {
          if (student) {
            this.student = student;
            this.totalMarks = this.student.result1.totalMarks + this.student.result2.totalMarks;
            this.obtainedMarks = this.student.result1.obtainedMarks + this.student.result2.obtainedMarks;
            this.percentage = ((this.obtainedMarks / this.totalMarks) * 100).toFixed(1);
          } else {
            console.log('data not found');
          }
        });
      }
    });
  }

}
