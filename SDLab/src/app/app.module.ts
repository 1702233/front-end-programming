import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// pages
import { HomeComponent } from './modules/pages/home/home.component';
import { LoginpageComponent } from './modules/pages/loginpage/loginpage.component';
import { BookingoverviewComponent } from './modules/pages/bookingoverview/bookingoverview.component';
import { QRscannerComponent } from './modules/pages/qrscanner/qrscanner.component';
// components
import { CalenderComponent } from './modules/components/calender/calender.component';
import { BookingformComponent } from './modules/components/bookingform/bookingform.component';
import { RegisterpageComponent } from './modules/pages/registerpage/registerpage.component';
// core
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
// services
import { AuthguardService } from './core/services/authguard.service';
import { BookingformService } from './core/services/bookingform.service';
import { RegisterService } from './core/services/register.service';
import { BookingacceptanceComponent } from './modules/pages/bookingacceptance/bookingacceptance.component';
import { RegisteracceptanceComponent } from './modules/pages/registeracceptance/registeracceptance.component';


const appRoutes: Routes = [
  /// path : '**' als laatste toevoegen (rest of paths) met
  { path: 'login', component: LoginpageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'booking-overview', component: BookingoverviewComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: 'register-acceptance', component: RegisteracceptanceComponent},
  { path: 'booking-acceptance', component: BookingacceptanceComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path : 'qrscanner', component : QRscannerComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalenderComponent,
    LoginpageComponent,
    BookingoverviewComponent,
    BookingacceptanceComponent,
    BookingformComponent,
    HeaderComponent,
    FooterComponent,
    RegisterpageComponent,
    QRscannerComponent,
    RegisteracceptanceComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthguardService,
    BookingformService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
