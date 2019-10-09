import { Component, OnInit } from '@angular/core';
import { Bookingform } from 'src/app/shared/models/bookingform.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { BookingformService } from 'src/app/core/services/bookingform.service';
import { AuthguardService } from 'src/app/core/services/authguard.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookingacceptance',
  templateUrl: './bookingacceptance.component.html',
  styleUrls: ['./bookingacceptance.component.css']
})
export class BookingacceptanceComponent implements OnInit {
  list: Bookingform[];
  updated: Bookingform[];
  constructor(private Authguard: AuthguardService,
    private service: BookingformService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getBoekingen().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Bookingform
      })
    })
  }

  onAccept(id: string) {
    if (confirm("Weet je zeker dat je deze boeking wilt goedkeuren?")) {
      this.firestore.collection("boekingen").doc(id).update({
        "status": "goedgekeurd",
      });
      this.toastr.success("Success", "Boeking goedgekeurd");
      this.firestore.collection("boekingen").doc(id).update({ "qrcode": this.qrcodeStringGenerator(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') })
    }
    // TODO update google calendar.

  }

  onDeny(id: string) {
    if (confirm("Weet je zeker dat je deze boeking wilt afkeuren?")) {
      this.firestore.collection("boekingen").doc(id).update({
        "status": "afgekeurd",
      });
      this.toastr.warning("Success", "Boeking afgekeurd.");
    }

  }

  qrcodeStringGenerator(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  canActivate() {
    return this.Authguard.canActivate();
  }

  canActivateAdmin() {
    return this.Authguard.canActivateAdmin();
  }

}


