import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { BookingformService } from 'src/app/core/services/bookingform.service';


@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent implements OnInit {

  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
    private BookingformService : BookingformService
  ) { 
    this.checkoutForm = this.formBuilder.group({
      name: '',
      email: ''
    });
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.resetForm();
    }
    this.BookingformService.formData ={
      fullname: '',
      googlemail : '',
      schoolmail : '',
      status : null,
      starttime : null,
      endtime : null,
    }
  }

  onSubmit(form:NgForm) {
    let data = form.value;
  
  }

  ngOnInit() {
    this.resetForm();
  }

}
