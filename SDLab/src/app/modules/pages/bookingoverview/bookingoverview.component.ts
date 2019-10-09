import { Component, OnInit } from '@angular/core';
import { BookingformService } from 'src/app/core/services/bookingform.service';
import { Bookingform } from 'src/app/shared/models/bookingform.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookingoverview',
  templateUrl: './bookingoverview.component.html',
  styleUrls: ['./bookingoverview.component.css']
})
export class BookingoverviewComponent implements OnInit {
  list: Bookingform[];
  constructor(private service: BookingformService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
      this.service.getBoekingen().subscribe(actionArray =>{
        this.list = actionArray.map(item => {
          return {
            id : item.payload.doc.id,
            ...item.payload.doc.data()} as Bookingform
        })
      })
    })
  }

  onEdit(booking: Bookingform) {
    this.service.formData = Object.assign({}, booking);

  }

  onDelete(id: string) {
    if (confirm("Weet je zeker dat je deze boeking wilt verwijderen?")) {
      this.firestore.doc('boekingen/' + id).delete();
      this.toastr.warning("deleted sucessfully", "Boeking")
    }
  }
}
