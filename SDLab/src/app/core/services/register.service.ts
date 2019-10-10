import { Injectable } from '@angular/core';
import { Registerform } from 'src/app/shared/models/registerform.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  formData: Registerform;

  constructor(private firestore: AngularFirestore) { }

  getRegistrations() {
    return this.firestore.collection('registraties').snapshotChanges();
  }

  getRegistration(id: string) {
    return this.firestore.collection('registraties/' + id).snapshotChanges();
  }

  getIngediendeRegistrations() {
    return this.firestore.collection('registraties', ref => ref.where('status', '==', 'Ingediend')).snapshotChanges();
  }
}
