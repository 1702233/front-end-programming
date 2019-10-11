import { Component } from '@angular/core';
import { AuthguardService } from './core/services/authguard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SDLab';

  constructor(private Authguard: AuthguardService) {}

  canActivate() {
    return this.Authguard.canActivate();
  }

  canActivateAdmin() {
    return this.Authguard.canActivateAdmin();
  }

  canNotActivate() {
    return this.Authguard.canNotActivate();
  }
}
