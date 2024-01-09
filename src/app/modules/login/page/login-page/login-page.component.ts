import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { APP_ROUTES } from '../../../../constants/routes';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  showRecoveryPassForm = false;

  constructor(private readonly _router: Router) {}
  goToRecoverPassword(): void {
    this.showRecoveryPassForm = true;
  }

  gotToLogin(): void {
    this.showRecoveryPassForm = false;
  }

  goToHomePage(): void {
    void this._router.navigate([APP_ROUTES.audioRecording]);
  }
}
