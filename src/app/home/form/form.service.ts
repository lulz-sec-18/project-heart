import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth'
import {environment} from '../../../environments/environment'

@Injectable()
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
  
  googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: 'user@example.com',
    });
    firebase.auth().signInWithPopup(provider).then((result => {
      let user = result.user
      console.log(user);
    })).catch((error: any)=>console.log(error))
  }


  
  
}
