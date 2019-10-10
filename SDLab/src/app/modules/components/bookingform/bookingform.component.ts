import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { BookingformService } from 'src/app/core/services/bookingform.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent implements OnInit {

  user = firebase.auth();
  constructor(
    private firestore: AngularFirestore,
    private service: BookingformService,
    private toastr: ToastrService
  ) {

  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    // default values voor bookingform
    this.service.formData = {
      id: null,
      name: '',
      begintime: '2019-10-20T16:30',
      endtime: '2019-10-20T18:30',
      opmerking: '',
      googlemail: this.user.currentUser.email,
      schoolmail: 'schoolmail@student.hu.nl',
      status: 'ingediend',
    };
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('boekingen').add(data);
    } else {
      this.firestore.doc('boekingen/' + form.value.id).update(data);
    }
    this.resetForm();
    this.toastr.success('submitted succesfully', 'Boeking gedaan.');
  }

  ngOnInit() {
    this.resetForm();
  }

}
