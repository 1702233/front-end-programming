import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterService } from 'src/app/core/services/register.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


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

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      id: null,
      studentenmail: '',
      studentennummer: null,
      voornaam: '',
      achternaam: ''
    };
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('registraties').add(data);
    } else {
      this.firestore.doc('registraties/' + form.value.id).update(data);
    }
    this.resetForm(form);
    this.toastr.success('submitted succesfully', 'Registratie gedaan.');
  }

  ngOnInit() {
    this.resetForm();
  }

}
