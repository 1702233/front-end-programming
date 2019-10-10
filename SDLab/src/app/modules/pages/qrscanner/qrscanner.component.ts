import { Component, OnInit } from '@angular/core';
import { BookingformService } from 'src/app/core/services/bookingform.service';
import Instascan from 'instascan';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.css']
})
export class QRscannerComponent implements OnInit {
  private validCodes = [];
  private videoElement = document.getElementById('preview');
  private opts = {
    video: this.videoElement,
    backgroundScan: true,
    refractoryPeriod: 5000,
    scanPeriod: 1
  };
  private scanner = new Instascan.Scanner(this.opts);

  constructor(private service: BookingformService) { }

  // Fill the list with all valid QR codes in the database
  fillValidCodes() {
    this.service.getBoekingen().subscribe(actionArray => {
      let dataobject;
      actionArray.map(item => {
        dataobject = item.payload.doc.data();
        if (dataobject.qrcode) {
          console.log(dataobject.qrcode);
          const now = new Date().getTime();
          if (now >= Date.parse(dataobject.begintime) && now < Date.parse(dataobject.endtime)) {
            this.validCodes.push(dataobject.qrcode);
            console.log(this.validCodes);
          }
        }
      });
    });
  }

  // Check the scanned code against the list of valid codes
  checkCode(QRvalue) {
    this.fillValidCodes();
    if (this.validCodes.includes(QRvalue)) {
      this.validCodes.length = 0;
      return true;
    } else {
      this.validCodes.length = 0;
      return false;
    }
  }

  // Starts the scanning process and changes the screen depending on the result of checkCode()
  // TODO: Use property and style binding instead of getElementById. This was tested and didn't work properly.
  // TODO: The camera isn't displayed, but does turn on and scan codes. Probably an issue with the combination of Instascan and Angular
  processScan() {
    this.scanner.addListener('scan', (content) => {
      console.log(content);
      let scannedCode;
      scannedCode = content;
      if (this.checkCode(scannedCode)) {
        document.getElementById('returnmessage').innerHTML = 'Deze student mag de ruimte in!';
        document.getElementById('indexbody').style.backgroundColor = 'green';
        document.getElementById('qrbody').style.backgroundColor = 'green';
      } else {
        document.getElementById('returnmessage').innerHTML = 'MAG NIET!';
        document.getElementById('indexbody').style.backgroundColor = 'red';
        document.getElementById('qrbody').style.backgroundColor = 'red';
      }
      setTimeout(() => {
        document.getElementById('returnmessage').innerHTML = '';
        document.getElementById('indexbody').style.backgroundColor = '';
        document.getElementById('qrbody').style.backgroundColor = '';
      }, 5000);

    });
  }

  // Shows error message when there's no camera
  startCamera() {
    Instascan.Camera.getCameras().then(cameras => {
      if (cameras.length > 0) {
        this.scanner.start(cameras[0]);
      } else {
        console.error('Please enable Camera!');
      }
    });
  }

  ngOnInit() {
    this.startCamera();
    this.fillValidCodes();
    this.processScan();



  }

}
