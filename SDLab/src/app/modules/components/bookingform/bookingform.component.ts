import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { BookingformService } from 'src/app/core/services/bookingform.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent implements OnInit {

  constructor(
    private firestore : AngularFirestore,
    private service : BookingformService
  ) { 

  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.resetForm();
    }
    this.service.formData ={
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
    let data = form.value;
    this.firestore.collection('boekingen').add(data);
    this.resetForm(form);
  
  }

  ngOnInit() {
    this.resetForm();
  }

}
