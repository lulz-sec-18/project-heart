import { Injectable, NgZone } from '@angular/core';
import { User } from './models/user.modal';

import { patient } from './models/patient.model';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  patients: Observable<any[]>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
    if (this.userData) {
       this.patients = this.afs
      .collection('patients', (ref) =>
        ref.where('doctor_uid', '==', this.userData.uid)
      )
        .valueChanges();
      window.alert(this.userData.displayName)
    }
  }
  get getUserData() {
    return this.userData;
  }
  signIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  authLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
        window.console.log(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  signUp(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified
  }

  

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  createPatient(patient: patient) {
    const userRef: AngularFirestoreDocument<patient> = this.afs.doc(
      `patients/${patient.id}`
    );
    // patient = {doctor_uid:user.uid, ...patient}
    return userRef.set(patient, {
      merge: true,
    });
  }
  updatePatient(patient: patient) {
    const userRef: AngularFirestoreDocument<patient> = this.afs.doc(
      `patients/${patient.id}`
    );
    // patient = { doctor_uid: user.uid, ...patient };
    return userRef.update(patient);
  }
  deletePatient(patient: patient) {
    const userRef: AngularFirestoreDocument<patient> = this.afs.doc(
      `patients/${patient.id}`
    );
    return userRef.delete();
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }
}
