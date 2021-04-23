import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth'
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private firebaseConfig: object) {
    firebaseConfig = {
      apiKey: environment.firebase.apiKey,
      authDomain: environment.firebase.authDomain,
      projectId: environment.firebase.projectId,
      storageBucket: environment.firebase.storageBucket,
      messagingSenderId: environment.firebase.messagingSenderId,
      appId: environment.firebase.appId,
      measurementId: environment.firebase.measurementId,
    };
    firebase.initializeApp(this.firebaseConfig);
  }

  
  
}
