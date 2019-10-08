import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { BookingformService } from 'src/app/core/services/bookingform.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent implements OnInit {

  constructor(
    private firestore : AngularFirestore,
    private service : BookingformService,
    private toastr : ToastrService
  ) { 

  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.resetForm();
    }
    // default values voor bookingform
    this.service.formData ={
      id: null,
      name: 'default Piet',
      begintime : '2018-10-20T16:30',
      endtime : '2018-10-20T18:30',
      opmerking : 'default opmerking',
      googlemail : 'gmail@gmail.com',
      schoolmail : 'schoolmail@student.hu.nl',
      status : 'ingediend',
    }
  }

  onSubmit(form:NgForm) {
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id==null) {
      this.firestore.collection('boekingen').add(data);
    } else {
      this.firestore.doc('boekingen/'+form.value.id).update(data);
    }
    this.resetForm(form);
    this.toastr.success("submitted succesfully","Boeking gedaan.");
  }

  ngOnInit() {
    this.resetForm();
  }

}
