import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { APP_ROUTES } from '../../../../constants/routes';
import { ILoginForm } from '../../interface/login.interface';
import { AuthRestService } from '../../service/auth.rest.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  showRecoveryPassForm = false;
  loginFormValues!: ILoginForm;

  constructor(
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
    private readonly _authRestService: AuthRestService,
  ) {}
  goToRecoverPassword(): void {
    this.showRecoveryPassForm = true;
  }

  gotToLogin(): void {
    this.showRecoveryPassForm = false;
  }

  listenLoginForm(values: ILoginForm): void {
    this.loginFormValues = values;
  }
  goToHomePage(): void {
    const login$ = this._authRestService.login(this.loginFormValues);

    login$.subscribe({
      next: (val) => {
        this._cookieService.set('token', val.token, { sameSite: 'Lax' });
        this._cookieService.set('status', val.passwordStatus, { sameSite: 'Lax' });
        void this._router.navigate([APP_ROUTES.audioRecording]);
      },
    });
  }
}
