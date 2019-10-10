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


  getBoeking(id: string) {
    return this.firestore.collection('boekingen/' + id).snapshotChanges();
  }
}
