import { Component, OnInit } from '@angular/core';
import Instascan from 'instascan';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.css']
})
export class QRscannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const opts = {
      video: document.getElementById('preview'),
      backgroundScan: false,
      refractoryPeriod: 5000,
      scanPeriod: 15
    };
    const scanner = new Instascan.Scanner(opts);
    let scannedCode;
    // Temporary list for testing
    const bookings = ['1234', '4567', '7899'];

    scanner.addListener('scan', function(content) {
      console.log(content);
      scannedCode = content;
      if (checkCode(scannedCode)) {
        document.getElementById('returnmessage').innerHTML = 'Deze student mag de ruimte in!';
        document.getElementById('body').style.backgroundColor = 'green';
        setTimeout(function() {
          document.getElementById('returnmessage').innerHTML = '';
          document.getElementById('body').style.backgroundColor = 'white';
        }, 5000);
      } else {
        document.getElementById('returnmessage').innerHTML = 'MAG NIET!';
        document.getElementById('body').style.backgroundColor = 'red';
        setTimeout(function() {
          document.getElementById('returnmessage').innerHTML = '';
          document.getElementById('body').style.backgroundColor = 'white';
        }, 5000);
      }

    });

    Instascan.Camera.getCameras().then(cameras => {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('Please enable Camera!');
      }
    });

    function checkCode(QRvalue) {
      // todo check if QRvalue is in database and timestamp matches
      if (bookings.includes(scannedCode)) {
        return true;
      } else {
        return false;
      }
    }
  }

}
