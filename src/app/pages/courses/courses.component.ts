import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Course, FirestoreService } from 'src/app/shared/services/firestore.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: Course[];

  constructor(
    private toastService: ToastService,
    private firestore: FirestoreService
  ) {
    this.firestore.getCourses().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Course;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    ).subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        this.showDanger(`Error: ${error.message}`);
      }
    );
  }

  showDanger(msg) {
    this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 4000 });
  }

}
