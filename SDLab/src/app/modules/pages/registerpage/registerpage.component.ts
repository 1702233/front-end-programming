import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterService } from 'src/app/core/services/register.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  constructor(
    private service: RegisterService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { }

  user = firebase.auth();

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      id: null,
      studentenmail: '',
      studentennummer: null,
      voornaam: '',
      achternaam: '',
      status: 'Ingediend',
      gmail: this.user.currentUser.email,
    };
  }

  onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      console.log(data);
      this.firestore.collection('registraties').add(data);
    } else {
      this.firestore.doc('registraties/' + form.value.id).update(data);
    }
    this.resetForm(form);
    this.toastr.success('submitted succesfully', 'Succesvol geregistreerd.');
    setTimeout(this.redirect, 700);
  }
  redirect() {
    window.location.replace("http://localhost:4200/login");
  }

  ngOnInit() {
    this.resetForm();
    console.log(this.user.updateCurrentUser);
  }

}
