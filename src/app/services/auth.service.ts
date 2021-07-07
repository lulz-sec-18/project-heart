import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private patientsCollection:AngularFirestoreCollection<Patient>;
  userData: firebase.User;
  userId: string;
  patients: Observable<Patient[]>

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
  }

  get getUserData(): firebase.User {
    return this.userData;
  }

  firestoreInit(): void {
    if(this.isLoggedIn()){
      const user = JSON.parse(localStorage.getItem('user'));
      this.patientsCollection = this.afs.collection<Patient>('patients', (ref) =>
        ref.where('doctor_uid', '==', user.uid) //|| 'H9HgbzVQ7gSdme71Bc2KQ1MPaXD2')
      )
      this.patients = this.patientsCollection.valueChanges();
    }
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth
        .signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  async authLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.afAuth
        .signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.setUserData(result.user);
      window.console.log(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  setUserData(user: firebase.User) {
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

  async sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  async signUp(email: string, password: string) {
    try {
      const result = await this.afAuth
        .createUserWithEmailAndPassword(email, password);
      this.sendVerificationMail();
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  async forgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth
        .sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['home']);
  }

  async createPatient(patient: Patient) {
    const id = this.afs.createId()
    const userRef: AngularFirestoreDocument<Patient> = this.afs.doc(
      `patients/${id}`
    );
    patient = {...patient,id:id}
    return userRef.set(patient, {
      merge: true,
    });
    // const id = await this.afs.createId();
    // const modifiedPatient: Patient = await {...patient, id:id}
    // this.patientsCollection.doc(id).set(modifiedPatient);
    // console.log(patient)
  }

  async updatePatient(patient: Patient) {
    // const userRef: AngularFirestoreDocument<Patient> = this.afs.doc(
    //   `patients/${patient.id}`
    // );
    // // patient = { doctor_uid: user.uid, ...patient };
    // return userRef.update(patient);
    const patientDoc:AngularFirestoreDocument<Patient> = await this.afs.doc<Patient>(`patients/${patient.id}`)
    await patientDoc.update(patient);
  }

  async deletePatient(patient: Patient) {
    // const userRef: AngularFirestoreDocument<Patient> = this.afs.doc(
    //   `patients/${patient.id}`
    // );
    // return userRef.delete();
    const patientDoc:AngularFirestoreDocument<Patient> = await this.afs.doc<Patient>(`patients/${patient.id}`)
    await patientDoc.delete()
  }

  googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }
}
