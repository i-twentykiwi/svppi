import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Course {
    id: string;
    name: string;
    shortForm: string;
    desc: string;
    eligibility: string;
    duration: number;
    popular: string;
}

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
    profilePicSource: any;
}

@Injectable()
export class FirestoreService {
    constructor(private firestore: AngularFirestore) {}

    getCourses() {
        return this.firestore.collection('courses').snapshotChanges();
    }

    getStudents(collectionName) {
        return this.firestore.collection(collectionName).snapshotChanges();
    }

    searchStudent(collectionName, enrollmentNo, dob) {
        return this.firestore.collection(collectionName, ref => ref.where("enrollmentNo", "==", enrollmentNo).where("dob", "==", dob)).snapshotChanges();
    }

    getStudentbyId(collectionName, id) {
        return this.firestore.doc(`${collectionName}/${id}`).snapshotChanges();
    }

    addCourse(course: Course) {
        return this.firestore.collection('courses').add(course);
    }

    updateCourse(id: string, course: Course) {
        return this.firestore.doc('courses/' + id).update(course);
    }

    deleteCourse(id: string) {
        return this.firestore.doc('courses/' + id).delete();
    }

    // STUDENT

    addStudent(collectionName, student: Student) {
        delete student.profilePicSource;
        return this.firestore.collection(collectionName).add(student);
    }

    addResult(collectionName, result: any) {
        const id = result.id;
        delete result.id;

        if(result.year == "1") {
            return this.firestore.doc(`${collectionName}/${id}`).set({ result1: result }, { merge: true });
        } else {
            return this.firestore.doc(`${collectionName}/${id}`).set({ result2: result }, { merge: true });
        }
    }

    editStudent(collectionName, studentDetails) {
        const id = studentDetails.id;
        delete studentDetails.id;
        return this.firestore.doc(`${collectionName}/${id}`).set(studentDetails);
    }

    deleteStudent(collectionName, id: string) {
        return this.firestore.doc(`${collectionName}/${id}`).delete();
    }
}