import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//pages
import { HomeComponent } from './modules/pages/home/home.component';
import { LoginpageComponent } from './modules/pages/loginpage/loginpage.component';
import { BookingoverviewComponent } from './modules/pages/bookingoverview/bookingoverview.component';
//components
import { CalenderComponent } from './modules/components/calender/calender.component';
import { BookingformComponent } from './modules/components/bookingform/bookingform.component';
//core
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

const appRoutes: Routes = [
  /// path : '**' als laatste toevoegen (rest of paths) met
    { path : 'login', component : LoginpageComponent },
    { path : 'home', component : HomeComponent },
    { path : 'booking-overview', component : BookingoverviewComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalenderComponent,
    LoginpageComponent,
    BookingoverviewComponent,
    BookingformComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    ),
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
