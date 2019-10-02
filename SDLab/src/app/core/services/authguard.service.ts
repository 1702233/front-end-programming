import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  authState: firebase.User;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe(auth => this.authState = auth);
  }

  googleLogin() {
    return this.firebaseAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
      return this.firebaseAuth.auth.signOut();
  }

  canActivate() {
    return this.authState !== null;;
  }
}
