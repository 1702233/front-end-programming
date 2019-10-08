import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  constructor() { }

  sendRegistration() {
    let studentmail = (document.getElementById('studentenmail') as HTMLInputElement).value;
    let studentennummer = (document.getElementById('studentennummer') as HTMLInputElement).value;
    let voornaam = (document.getElementById('voornaam') as HTMLInputElement).value;
    let achternaam = (document.getElementById('achternaam') as HTMLInputElement).value;
    console.log('Added: ' + studentmail + ' ' + studentennummer + ' ' + voornaam + ' ' + achternaam + ' to registrationlist');

  }

  ngOnInit() {
  }

}
