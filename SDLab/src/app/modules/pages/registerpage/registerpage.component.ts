import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  constructor() { }

  sendRegistration() {
    var studentmail = (<HTMLInputElement>document.getElementById('studentenmail')).value;
    var studentennummer = (<HTMLInputElement>document.getElementById('studentennummer')).value;
    var voornaam = (<HTMLInputElement>document.getElementById('voornaam')).value;
    var achternaam = (<HTMLInputElement>document.getElementById('achternaam')).value;

    // console.log('Added: ' + studentmail + ' ' + studentennummer + ' ' + voornaam + ' ' + achternaam + ' to registrationlist');

  }

  ngOnInit() {
  }

}
