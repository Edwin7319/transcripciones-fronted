import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

import { FORM_DEBOUNCE_TIME } from '../../../../constants/constants';
import { FormUtil } from '../../../../utils/form.util';
import { ILoginForm } from '../../interface/login.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output()
  signInEvent: EventEmitter<ILoginForm> = new EventEmitter<ILoginForm>();

  form!: FormGroup;
  subscriptions: Array<Subscription> = [];

  constructor(private readonly _formUtils: FormUtil) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        this._formUtils.requiredValidator('correo'),
        this._formUtils.minLengthValidator('correo', 5),
        this._formUtils.emailValidator,
      ]),
      password: new FormControl('', [
        this._formUtils.requiredValidator('contraseña'),
        this._formUtils.minLengthValidator('contraseña', 5),
      ]),
    });
  }
  ngOnInit(): void {
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  eventSubmit(): void {
    this.form.markAllAsTouched();
  }

  listenFormChanges(): void {
    const form$ = this.form.valueChanges.pipe(debounceTime(FORM_DEBOUNCE_TIME)).subscribe({
      next: () => {
        if (!this.form.invalid) {
          this.signInEvent.emit({
            ...this.form.getRawValue(),
          });
        } else {
          this.signInEvent.emit(undefined);
        }
      },
    });
    this.subscriptions.push(form$);
  }
}
