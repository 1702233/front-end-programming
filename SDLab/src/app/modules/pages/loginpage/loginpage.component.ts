import { Component, OnInit } from '@angular/core';
import { AuthguardService } from 'src/app/core/services/authguard.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  

  constructor(private firebaseAuth: AngularFireAuth, private Authguard: AuthguardService) { 
  }
  user = firebase.auth().currentUser;


  googleLogin() {
    return this.firebaseAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
      return this.firebaseAuth.auth.signOut();
  }

  canActivate() {
    return this.Authguard.canActivate();
  }

  canActivateAdmin() {
    return this.Authguard.canActivateAdmin();
  }


  onSignIn(firebaseAuth) {
    this.user = firebase.auth().currentUser;
    console.log('ID: ' + this.user.displayName); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + this.user.displayName);
    console.log('Image URL: ' + this.user.displayName);
    console.log('Email: ' + this.user.email); // This is null if the 'email' scope is not present.
  }

  ngOnInit() {
  }

}
