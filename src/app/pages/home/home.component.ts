import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

import { Course, FirestoreService } from 'src/app/shared/services/firestore.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images = [1,2,3,4,5].map((n) => `assets/images/carousel/${n}.jpg`);
  testimonials = [
    {
      id: 1,
      name: "Anand Verma",
      quote: "The atmosphere there is wonderful. I have studied there for nine whole months. therefore, I can tell that it was one of the best place i have ever studied in. I have improved dramatically over that period. They taught me how to improve my knowledge and style of writing.",
      post: "~ Dialysis Technician",
      hospital: "Global Hospital"
    },
    {
      id: 2,
      name: "Mohit Sharma",
      quote: "I found Sardar Vallabhbhai Patel Paramedical Institute to be wonderful. The things taught in the classes here helped me a lot to deal things in my classes with the help of my lectures. I am doing pretty well in my classes thanks to my faculty at SVPPI.",
      post: "~ Physiotherapist",
      hospital: "Gayatri Hospital"
    },
    {
      id: 3,
      name: "Anita Singh",
      quote: "Deciding to move Sardar Vallabhbhai Patel Paramedical Institute to study this course has been one of the most rewarding decisions of my life. The course has exceeded my expectations. It is run by highly trained staff who are qualified paramedics.",
      post: "~ OT Technician",
      hospital: "Metro Hospital"
    },
    {
      id: 4,
      name: "Robin Jose",
      quote: "I felt very good by taking admission in Sardar Vallabhbhai Paramedical Institue. I found a way to be successful from here.",
      post: "~ Medical Lab Techinician",
      hospital: "Lal Path Labs"
    },
    {
      id: 5,
      name: "Shohib Pasha",
      quote: "After going through many efforts i found this wonderful institute. I really liked the way they educate here. I'm very grateful that i got success from SVPPI.",
      post: "~ X-RAY Technician",
      hospital: "Laxmi Hospital"
    }
  ]

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  faStar = faStar;
  faStarHalf = faStarHalfAlt;

  courses: Course[];

  @ViewChild('MainCarousel', { static: true }) carousel: NgbCarousel;

  constructor(
    private router: Router,
    config: NgbCarouselConfig,
    private toastService: ToastService,
    private firestore: FirestoreService,
  ) { 
    config.animation = true;

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
        this.courses = data.filter((item) => (item.popular === "true"));
      },
      (error) => {
        this.showDanger(`Error: ${error.message}`);
      }
    );
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  showSuccess(msg) {
    this.toastService.show(msg, { classname: 'bg-success text-light', delay: 4000 });
  }

  showDanger(msg) {
    this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 4000 });
  }

  goTo(page) {
    this.router.navigate([page]);
  }

}
