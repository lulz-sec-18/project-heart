import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private patientsCollection: AngularFirestoreCollection<Patient>;
  userData: firebase.User;
  userId: string;
  patients: Observable<Patient[]>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
    public _snackBar: MatSnackBar
  ) {
    /* Saving user data in localstorage when
  logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
        // JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  get getUserData(): User {
    return this.userData;
  }

  firestoreInit(): void {
    try {
      if (this.isLoggedIn()) {
        const user = JSON.parse(localStorage.getItem('user'));
        this.patientsCollection = this.afs.collection<Patient>(
          'patients',
          (ref) => ref.where('doctor_uid', '==', user.uid)
        );
        this.patients = this.patientsCollection.valueChanges();
      }
    } catch (error) {
      throw Error(error);
    }
  }

  async signIn(email: string, password: string) {
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(user);
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  async authLogin(provider: firebase.auth.AuthProvider) {
    await this.afAuth
      .signInWithPopup(provider)
      .then(({ user }) => {
        this.setUserData(user);
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  setUserData(user: firebase.User) {
    try {
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
    } catch (error) {
      throw Error(error);
    }
  }

  async sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  async signUp(email: string, password: string) {
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.sendVerificationMail();
        this.setUserData(user);
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  async forgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      // window.alert('Password reset email sent, check your inbox.');
      return true;
    } catch (error) {
      throw Error(error);
    }
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified;
  }

  async signOut() {
    await this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log(error);
        // throw Error(error);
      });
  }

  // Creates a new Patient
  async createPatient(patient: Patient) {
    try {
      const id = this.afs.createId();
      const userRef: AngularFirestoreDocument<Patient> = this.afs.doc(
        `patients/${id}`
      );
      patient = { ...patient, id: id };
      return userRef.set(patient, {
        merge: true,
      });
    } catch (error) {
      throw Error(error);
    }
  }

  // Update Patient in firestore
  async updatePatient(patient: Patient) {
    try {
      // const patientDoc: AngularFirestoreDocument<Patient> =
      await this.afs.doc<Patient>(`patients/${patient.id}`).update(patient);
      // await patientDoc.update(patient);
    } catch (error) {
      throw Error(error);
    }
  }

  // Delete patient from firestore
  async deletePatient(patient: Patient) {
    try {
      const patientDoc: AngularFirestoreDocument<Patient> =
        await this.afs.doc<Patient>(`patients/${patient.id}`);
      patientDoc.delete();
    } catch (error) {
      throw Error(error);
    }
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider()).catch(
      (err) => {
        throw Error(err);
      }
    );
  }

  openSnackbar(message: string, isError: boolean = true) {
    const action = isError ? 'Error':'Success'
    this._snackBar.open(message,action , {
      duration: 3000,
      verticalPosition: !isError ? 'bottom': 'top',
      horizontalPosition: !isError ? 'center' : 'right',
      panelClass:!isError ? '' : 'toast-error',
    });
  }
}
