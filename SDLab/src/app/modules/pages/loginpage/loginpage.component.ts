import { Component, OnInit } from '@angular/core';
import { AuthguardService } from 'src/app/core/services/authguard.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterService } from 'src/app/core/services/register.service';
import * as firebase from 'firebase/app';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {


  constructor(
    private firebaseAuth: AngularFireAuth,
    private Authguard: AuthguardService,
    private service: RegisterService) {

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

  canNotActivate() {
    return this.Authguard.canNotActivate();
  }

  onSignIn() {
    this.user = firebase.auth().currentUser;
    console.log('ID: ' + this.user.displayName); // Do not send to your backend! Use an ID token instead.
    console.log('Image URL: ' + this.user.displayName);
    console.log('Email: ' + this.user.email); // This is null if the 'email' scope is not present.
  }

  checkUser() {
    const gmail = this.user.email;
    console.log('checkUser krijgt: ' + gmail + ' mee!');
  }

  ngOnInit() {
  }

}