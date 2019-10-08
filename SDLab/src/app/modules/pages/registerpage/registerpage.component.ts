import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  constructor() { }

  sendRegistration() {
    let studentmail = (<HTMLInputElement> document.getElementById('studentenmail')).value;
    let studentennummer = (<HTMLInputElement> document.getElementById('studentennummer')).value;
    let voornaam = (<HTMLInputElement> document.getElementById('voornaam')).value;
    let achternaam = (<HTMLInputElement> document.getElementById('achternaam')).value;

    // console.log('Added: ' + studentmail + ' ' + studentennummer + ' ' + voornaam + ' ' + achternaam + ' to registrationlist');

  }

  ngOnInit() {
  }

}
