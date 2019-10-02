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

  constructor(private firebaseAuth: AngularFireAuth, private Authguard: AuthguardService) { }

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

  ngOnInit() {
  }

}
