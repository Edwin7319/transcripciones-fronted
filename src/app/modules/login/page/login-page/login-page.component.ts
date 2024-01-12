import { Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ECookie, EPasswordStatus } from '../../../../constants/constants';
import { APP_ROUTES } from '../../../../constants/routes';
import { ILoginForm, IRecoveryPasswordForm, IUpdatePasswordForm } from '../../interface/login.interface';
import { UpdatePasswordModalComponent } from '../../modal/update-password-modal/update-password-modal.component';
import { AuthRestService } from '../../service/auth.rest.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  showRecoveryPassForm = false;
  loginFormValues!: ILoginForm;
  recoveryPasswordFormValue!: IRecoveryPasswordForm;

  constructor(
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
    private readonly _authRestService: AuthRestService,
    private readonly _dialog: MatDialog,
    private readonly _toaster: ToastrService,
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
        this._cookieService.set(ECookie.token, val.token, { sameSite: 'Lax' });
        this._cookieService.set(ECookie.passStatus, val.passwordStatus, { sameSite: 'Lax' });

        if (val.passwordStatus === EPasswordStatus.GENERATED) {
          this.openModalToUpdatePassword();
          return;
        }

        void this._router.navigate([APP_ROUTES.audioRecording]);
      },
    });
  }

  listenRecoveryPasswordForm(values: IRecoveryPasswordForm): void {
    this.recoveryPasswordFormValue = values;
  }

  recoveryPassword(): void {
    const recovery$ = this._authRestService.recoveryPassword(this.recoveryPasswordFormValue);

    recovery$.subscribe({
      next: () => {
        this.showRecoveryPassForm = false;
        void Swal.fire({
          title: 'Recuperar contraseña',
          text: 'Se ha generado una nueva contraseña temporal la cual ha sido enviada a su correo.',
          icon: 'success',
          confirmButtonColor: '#012e54',
        });
      },
    });
  }

  private openModalToUpdatePassword(): void {
    const dialogRef = this._dialog.open(UpdatePasswordModalComponent, {
      width: '40em',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: (response: IUpdatePasswordForm) => {
        this.updatePassword(response);
      },
    });
  }

  private updatePassword(passwordForm: IUpdatePasswordForm): void {
    const updatePass$ = this._authRestService.updatePassword({
      email: this.loginFormValues.email,
      password: passwordForm.password,
      newPassword: passwordForm.newPassword,
    });

    updatePass$.subscribe({
      next: () => {
        this._toaster.success('Se ha actualizado de manera correcta', 'Contraseña');
        this._cookieService.set(ECookie.passStatus, EPasswordStatus.VALIDATED, { sameSite: 'Lax' });
        void this._router.navigate([APP_ROUTES.audioRecording]);
      },
    });
  }
}
