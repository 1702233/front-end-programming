import { Component, OnInit } from '@angular/core';
import { Registerform } from 'src/app/shared/models/registerform.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterService } from 'src/app/core/services/register.service';
import { AuthguardService } from 'src/app/core/services/authguard.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registeracceptance',
  templateUrl: './registeracceptance.component.html',
  styleUrls: ['./registeracceptance.component.css']
})
export class RegisteracceptanceComponent implements OnInit {
  list: Registerform[];

  constructor(
    private Authguard: AuthguardService,
    private service: RegisterService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getRegistrations().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Registerform;
      });
    });
  }

  acceptRegistration(id: string) {
    if (confirm('Weet je zeker dat je deze registratie wilt goedkeuren?')) {
      this.firestore.collection('registraties').doc(id).update({
        'status': 'goedgekeurd',
      });
      this.toastr.success('Success', 'Boeking goedgekeurd');
    }
  }

  denyRegistration(id: string) {
    if (confirm('Weet je zeker dat je deze registratie wilt afkeuren?')) {
      this.firestore.collection('registraties').doc(id).update({
        'status': 'afgekeurd',
      });
      this.toastr.warning('Success', 'Registratie afgekeurd.');
    }
  }

  canActivate() {
    return this.Authguard.canActivate();
  }

  canActivateAdmin() {
    return this.Authguard.canActivateAdmin();
  }
}
