import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user.model';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Registerform } from 'src/app/shared/models/registerform.model';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  authState: firebase.User;
  user = firebase.auth();
  user$: Observable<User>;
  userList: Registerform[];

  constructor(
    private firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    this.firebaseAuth.authState.subscribe(auth => this.authState = auth);
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.firebaseAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }

  async signOut() {
    await this.firebaseAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }


  // Deze functie kijkt of de meegegeven gmail in de database staat, zoja dan kijkt die of er een status van goedgekeurd bij is.

  // checkUsers(gmail) {
  //   const users = this.afs.collection('registraties').doc(gmail);
  //   users.get()
  //     .toPromise()
  //     .then(doc => {
  //       console.log('&@&#@*#@*$@&*$&*@$&*@$&*@$@&*^*&$@*^&@$^@^$@$^@$^$^@^');
  //       console.log(gmail);
  //       if (!doc.exists) {
  //         console.log('No such document!');
  //         // redirect naar regiterpage
  //         window.location.replace('/register');
  //       } else {
  //       if (doc.get('status') == 'goedgekeurd') {
  //         console.log('Document data:', doc.data());
  //         window.location.replace('/home');
  //       } else {
  //         console.log('In else');
  //         window.location.replace('/register');
  //       }
  //     });
  // }

  canActivate() {
    return this.authState !== null;
  }

  canActivateAdmin() {
    this.user.updateCurrentUser;
    return (this.authState !== null) && (this.user.currentUser.email === 'gideon.bruijn@gmail.com');
  }

  canNotActivate() {
    return this.authState === null;
  }
}
