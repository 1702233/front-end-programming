import { Injectable } from '@angular/core';
import { Bookingform } from 'src/app/shared/models/bookingform.model';

@Injectable({
  providedIn: 'root'
})
export class BookingformService {
  formData : Bookingform;
  constructor() { }
}
