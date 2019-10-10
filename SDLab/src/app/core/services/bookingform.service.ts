import { Injectable } from '@angular/core';
import { Bookingform } from 'src/app/shared/models/bookingform.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingformService {
  formData: Bookingform;

  constructor(private firestore: AngularFirestore) { }

  getBoekingen() {
    return this.firestore.collection('boekingen').snapshotChanges();
  }

  getIngediendeBoekingen() {
    return this.firestore.collection('boekingen', ref => ref.where('status', '==', 'ingediend')).snapshotChanges();
  }

  getGoedgekeurdeBoekingen() {
    return this.firestore.collection('boekingen', ref => ref.where('status', '==', 'goedgekeurd')).snapshotChanges();
  }

  setFilter(filter) {
    return this.firestore.collection('boekingen', ref => ref.where('status', '==', filter)).snapshotChanges();
  }
  getBoekingByGmail(gmail: string) {
    //als je beheerder bent krijg je alle boekingen 
    if (gmail == 'gideon.bruijn@gmail.com') {
      return this.firestore.collection('boekingen').snapshotChanges();
    } else {
      return this.firestore.collection('boekingen', ref => ref.where('googlemail', '==', gmail)).snapshotChanges();
    }
  }


  getBoeking(id: string) {
    return this.firestore.collection('boekingen/' + id).snapshotChanges();
  }
}
