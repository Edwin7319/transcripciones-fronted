import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, Subscription } from 'rxjs';

import { FORM_DEBOUNCE_TIME } from '../../../../constants/constants';
import { FormUtil } from '../../../../utils/form.util';
import { IUpdatePasswordForm } from '../../interface/login.interface';

@Component({
  selector: 'app-update-password-modal',
  templateUrl: './update-password-modal.component.html',
  styles: [],
})
export class UpdatePasswordModalComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formValues: IUpdatePasswordForm | undefined;
  subscriptions: Array<Subscription> = [];
  passwordError = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdatePasswordModalComponent>,
    private readonly _formUtils: FormUtil,
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      password: new FormControl(null, [this._formUtils.requiredValidator('contraseña')]),
      newPassword: new FormControl(null, [this._formUtils.requiredValidator('contraseña')]),
      confirmPassword: new FormControl(null, [this._formUtils.requiredValidator('contraseña')]),
    });
  }

  eventSubmit(): void {
    this.form.markAllAsTouched();
  }

  ngOnInit(): void {
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  listenFormChanges(): void {
    const form$ = this.form.valueChanges.pipe(debounceTime(FORM_DEBOUNCE_TIME)).subscribe({
      next: () => {
        this.passwordError = '';
        if (this.form.invalid) {
          this.formValues = undefined;
          return;
        }

        const matchNewPassword = this.checkPasswords({ ...this.form.getRawValue() });
        if (!matchNewPassword) {
          this.passwordError = 'La contraseña no coincide';
          this.formValues = undefined;
        }

        this.formValues = this.form.getRawValue();
      },
    });
    this.subscriptions.push(form$);
  }

  private checkPasswords(values: IUpdatePasswordForm): boolean {
    const { newPassword, confirmPassword } = values;
    return newPassword === confirmPassword;
  }
  acceptModal(): void {
    this.dialogRef.close({
      ...this.formValues,
    });
  }
}
